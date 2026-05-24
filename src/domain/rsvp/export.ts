import { TRANSPORT_LOCATIONS } from "@/data/transportOptions";
import type { AdminRow } from "@/types/admin";
import * as XLSX from "xlsx-js-style";
import { getRsvpMetrics } from "./metrics";
import {
  getAttendingCount,
  getBusGuests,
  getPickupLocation,
  getStatus,
  getTransportCount,
  type RsvpGuestLike,
} from "./selectors";

type Worksheet = XLSX.WorkSheet & {
  "!freeze"?: {
    xSplit?: number;
    ySplit?: number;
    topLeftCell?: string;
    activePane?: string;
    state?: string;
  };
};

type GuestExportRow = {
  row: AdminRow;
  guest: RsvpGuestLike;
  type: "Main" | "Extra";
};

const COLORS = {
  burgundy: "6B1F2B",
  white: "FFFFFF",
  gold: "F4E8D1",
  neutral: "FBFAF7",
  amber: "FCE8B2",
  green: "DDEFD8",
  red: "F3D2D2",
  text: "2C1E18",
};

const headerStyle = {
  fill: { patternType: "solid", fgColor: { rgb: COLORS.burgundy } },
  font: { bold: true, color: { rgb: COLORS.white } },
  alignment: { vertical: "center", wrapText: true },
};

const sectionStyle = {
  fill: { patternType: "solid", fgColor: { rgb: COLORS.burgundy } },
  font: { bold: true, color: { rgb: COLORS.white } },
  alignment: { vertical: "center", wrapText: true },
};

const extraGuestStyle = {
  fill: { patternType: "solid", fgColor: { rgb: COLORS.gold } },
  font: { italic: true, color: { rgb: COLORS.text } },
  alignment: { vertical: "center", wrapText: true },
};

const bodyStyle = {
  alignment: { vertical: "center", wrapText: true },
};

const statusStyles = {
  confirmed: {
    fill: { patternType: "solid", fgColor: { rgb: COLORS.green } },
    font: { bold: true, color: { rgb: "2F6B3A" } },
  },
  pending: {
    fill: { patternType: "solid", fgColor: { rgb: COLORS.amber } },
    font: { bold: true, color: { rgb: "7A5314" } },
  },
  declined: {
    fill: { patternType: "solid", fgColor: { rgb: COLORS.red } },
    font: { bold: true, color: { rgb: "8A2A2A" } },
  },
};

const safeRows = (rows: AdminRow[]) => (Array.isArray(rows) ? rows : []);

const formatStatus = (row: AdminRow) => getStatus(row).toUpperCase();

const formatYesNo = (value?: boolean) => (value ? "Yes" : "No");

const formatValue = (value?: string) => value || "-";

const getExportTimestamp = () => {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");

  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
  ].join("-");
};

const getPickupLabel = (guest: RsvpGuestLike) => {
  const locationId = getPickupLocation(guest);
  const location = TRANSPORT_LOCATIONS.find((item) => item.id === locationId);

  return location?.label || "-";
};

const getGuestRows = (row: AdminRow): GuestExportRow[] => [
  ...(Array.isArray(row.guests)
    ? row.guests.map((guest) => ({ row, guest, type: "Main" as const }))
    : []),
  ...(Array.isArray(row.extraGuests)
    ? row.extraGuests.map((guest) => ({ row, guest, type: "Extra" as const }))
    : []),
];

const getAllGuestRows = (rows: AdminRow[]) => safeRows(rows).flatMap(getGuestRows);

const getRange = (sheet: XLSX.WorkSheet) => {
  const ref = sheet["!ref"];
  return ref ? XLSX.utils.decode_range(ref) : undefined;
};

const getLastRow = (sheet: XLSX.WorkSheet) => getRange(sheet)?.e.r ?? -1;

const applyRowStyle = (sheet: XLSX.WorkSheet, rowIndex: number, style: unknown) => {
  const range = getRange(sheet);

  if (!range) {
    return;
  }

  for (let columnIndex = range.s.c; columnIndex <= range.e.c; columnIndex += 1) {
    const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex });

    if (sheet[cellAddress]) {
      sheet[cellAddress].s = style;
    }
  }
};

const applyCellStyle = (sheet: XLSX.WorkSheet, rowIndex: number, columnIndex: number, style: unknown) => {
  const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex });

  if (sheet[cellAddress]) {
    sheet[cellAddress].s = style;
  }
};

export const appendSpacerRow = (sheet: XLSX.WorkSheet) => {
  XLSX.utils.sheet_add_aoa(sheet, [[]], { origin: -1 });
};

export const createSectionHeaderRow = (sheet: XLSX.WorkSheet, values: Array<string | number>) => {
  XLSX.utils.sheet_add_aoa(sheet, [values], { origin: -1 });
  applyRowStyle(sheet, getLastRow(sheet), sectionStyle);
};

export const applyAutoColumnWidths = (sheet: XLSX.WorkSheet) => {
  const range = getRange(sheet);

  if (!range) {
    return;
  }

  sheet["!cols"] = Array.from({ length: range.e.c - range.s.c + 1 }, (_, index) => {
    const columnIndex = range.s.c + index;
    let maxLength = 10;

    for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex += 1) {
      const cell = sheet[XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex })];
      const value = cell?.v == null ? "" : String(cell.v);
      maxLength = Math.max(maxLength, value.length + 2);
    }

    return { wch: Math.min(Math.max(maxLength, 12), 42) };
  });
};

export const applyWorksheetStyles = (sheet: Worksheet) => {
  const range = getRange(sheet);

  if (!range) {
    return;
  }

  sheet["!freeze"] = {
    xSplit: 0,
    ySplit: 1,
    topLeftCell: "A2",
    activePane: "bottomLeft",
    state: "frozen",
  };

  sheet["!rows"] = Array.from({ length: range.e.r - range.s.r + 1 }, (_, index) => {
    const rowIndex = range.s.r + index;
    const hasValue = Array.from(
      { length: range.e.c - range.s.c + 1 },
      (__, columnOffset) =>
        sheet[XLSX.utils.encode_cell({ r: rowIndex, c: range.s.c + columnOffset })]?.v,
    ).some((value) => value != null && String(value).trim() !== "");

    return { hpt: rowIndex === 0 ? 24 : hasValue ? 22 : 10 };
  });

  for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex += 1) {
    for (let columnIndex = range.s.c; columnIndex <= range.e.c; columnIndex += 1) {
      const cell = sheet[XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex })];

      if (cell && !cell.s) {
        cell.s = bodyStyle;
      }
    }
  }

  applyRowStyle(sheet, 0, headerStyle);
  applyAutoColumnWidths(sheet);
};

export const buildSummarySheet = (rows: AdminRow[]) => {
  const metrics = getRsvpMetrics(rows);
  const sheet = XLSX.utils.aoa_to_sheet([
    ["Metric", "Value"],
    ["Total Groups", metrics.totalGroups],
    ["Confirmed Groups", metrics.confirmedGroups],
    ["Pending Groups", metrics.pendingGroups],
    ["Declined Groups", metrics.declinedGroups],
    ["Responded Groups", metrics.respondedGroups],
    ["Total Capacity", metrics.totalMaxGuests],
    ["Confirmed Guests", metrics.totalAttendingPeople],
    ["Bus Guests", metrics.transportPeople],
    ["Occupancy", metrics.occupancy],
  ]) as Worksheet;

  applyWorksheetStyles(sheet);

  return sheet;
};

export const buildGroupsSheet = (rows: AdminRow[]) => {
  const sheet = XLSX.utils.aoa_to_sheet([
    ["Family / Guest", "Status / Type", "Confirmed / Attending", "Extra Guests / Dietary", "Bus Guests / Transport", "Pickup"],
  ]) as Worksheet;

  safeRows(rows).forEach((row) => {
    const groupRowIndex = getLastRow(sheet) + 1;
    const extraGuests = Array.isArray(row.extraGuests) ? row.extraGuests.length : 0;

    createSectionHeaderRow(sheet, [
      row.familyLabel,
      formatStatus(row),
      `${getAttendingCount(row)}/${row.maxGuests ?? row.invitedCount}`,
      extraGuests,
      getTransportCount(row),
      "",
    ]);

    applyCellStyle(sheet, groupRowIndex, 1, statusStyles[getStatus(row)]);

    getGuestRows(row).forEach(({ guest, type }) => {
      XLSX.utils.sheet_add_aoa(
        sheet,
        [[
          guest.name || "+1 Invitat",
          type,
          formatYesNo(guest.attending),
          formatValue(guest.dietary),
          guest.transport?.type || "none",
          getPickupLabel(guest),
        ]],
        { origin: -1 },
      );

      if (type === "Extra") {
        applyRowStyle(sheet, getLastRow(sheet), extraGuestStyle);
      }
    });

    appendSpacerRow(sheet);
  });

  applyWorksheetStyles(sheet);

  return sheet;
};

export const buildTransportSheet = (rows: AdminRow[]) => {
  const sheet = XLSX.utils.aoa_to_sheet([["Pickup", "Guest", "Family", "Type"]]) as Worksheet;
  const busGuests = getAllGuestRows(rows).filter(({ guest }) =>
    getBusGuests({ guests: [guest], extraGuests: [] }).length > 0,
  );
  const configuredLocationIds = new Set(TRANSPORT_LOCATIONS.map((location) => location.id));

  TRANSPORT_LOCATIONS.forEach((location) => {
    const guestsForLocation = busGuests.filter(
      ({ guest }) => getPickupLocation(guest) === location.id,
    );

    if (guestsForLocation.length === 0) {
      return;
    }

    createSectionHeaderRow(sheet, [location.label, guestsForLocation.length, "", ""]);

    guestsForLocation.forEach(({ row, guest, type }) => {
      XLSX.utils.sheet_add_aoa(
        sheet,
        [[location.label, guest.name || "+1 Invitat", row.familyLabel, type]],
        { origin: -1 },
      );
    });

    appendSpacerRow(sheet);
  });

  const uncategorizedGuests = busGuests.filter(({ guest }) => {
    const pickupLocation = getPickupLocation(guest);

    return !pickupLocation || !configuredLocationIds.has(pickupLocation);
  });

  if (uncategorizedGuests.length > 0) {
    createSectionHeaderRow(sheet, ["Pickup missing", uncategorizedGuests.length, "", ""]);

    uncategorizedGuests.forEach(({ row, guest, type }) => {
      XLSX.utils.sheet_add_aoa(
        sheet,
        [["-", guest.name || "+1 Invitat", row.familyLabel, type]],
        { origin: -1 },
      );
    });
  }

  applyWorksheetStyles(sheet);

  return sheet;
};

export const buildDietarySheet = (rows: AdminRow[]) => {
  const dietaryRows = getAllGuestRows(rows)
    .filter(({ guest }) => Boolean(guest.dietary) && guest.dietary !== "none")
    .sort((a, b) => {
      const dietarySort = String(a.guest.dietary).localeCompare(String(b.guest.dietary));

      return dietarySort || a.row.familyLabel.localeCompare(b.row.familyLabel);
    });

  const sheet = XLSX.utils.aoa_to_sheet([
    ["Guest", "Family", "Dietary", "Notes"],
    ...dietaryRows.map(({ row, guest }) => [
      guest.name || "+1 Invitat",
      row.familyLabel,
      guest.dietary || "-",
      guest.dietaryNote || "-",
    ]),
  ]) as Worksheet;

  applyWorksheetStyles(sheet);

  return sheet;
};

export const buildRawSheet = (rows: AdminRow[]) => {
  const rawRows = safeRows(rows).flatMap((row) =>
    getGuestRows(row).map(({ guest, type }) => ({
      "Group ID": row.groupId,
      Family: row.familyLabel,
      Status: getStatus(row),
      "Invited Count": row.invitedCount,
      "Max Guests": row.maxGuests ?? row.invitedCount,
      "Confirmed Guests": getAttendingCount(row),
      "Bus Guests": getTransportCount(row),
      Guest: guest.name || "+1 Invitat",
      "Guest ID": guest.id || "",
      "Guest Type": type,
      Attending: formatYesNo(guest.attending),
      Dietary: guest.dietary || "none",
      "Dietary Notes": guest.dietaryNote || "-",
      "Transport Type": guest.transport?.type || "none",
      "Pickup ID": getPickupLocation(guest) || "-",
      Pickup: getPickupLabel(guest),
    })),
  );

  const sheet = XLSX.utils.json_to_sheet(rawRows) as Worksheet;

  applyWorksheetStyles(sheet);

  return sheet;
};

export const exportWorkbook = (rows: AdminRow[]) => {
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, buildSummarySheet(rows), "Summary");
  XLSX.utils.book_append_sheet(workbook, buildGroupsSheet(rows), "Groups & Guests");
  XLSX.utils.book_append_sheet(workbook, buildTransportSheet(rows), "Transport Logistics");
  XLSX.utils.book_append_sheet(workbook, buildDietarySheet(rows), "Dietary Restrictions");
  XLSX.utils.book_append_sheet(workbook, buildRawSheet(rows), "Full Raw Export");

  XLSX.writeFile(workbook, `rsvp-operations-report-${getExportTimestamp()}.xlsx`);
};

export const buildSummaryExport = (rows: AdminRow[]) => XLSX.utils.sheet_to_json(buildSummarySheet(rows), {
  header: 1,
});

export const buildGroupsExport = (rows: AdminRow[]) => XLSX.utils.sheet_to_json(buildGroupsSheet(rows));

export const buildTransportExport = (rows: AdminRow[]) =>
  XLSX.utils.sheet_to_json(buildTransportSheet(rows));
