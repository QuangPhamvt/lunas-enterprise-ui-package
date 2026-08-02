export const SELECT_WIDTH = 60;
export const ACTION_WIDTH = 60;
export const TABLE_HEADER_Z_INDEX = 40;
export const PINNED_COLUMN_Z_INDEX = 20;

export const TABLE_WRAPPER_SLOT_DISPLAY_NAMES = {
  tooltip: 'UITableTooltip',
  summaryBar: 'UITableSummaryBar',
  container: 'UITableContainer',
  analysisPanel: 'UITableAnalysisPanel',
} as const;

export const TABLE_WRAPPER_ROW_SLOT_NAMES = {
  tooltip: 'table-wrapper-tooltip-row',
  summaryBar: 'table-wrapper-summary-bar-row',
  container: 'table-wrapper-container-row',
  analysisPanel: 'table-wrapper-analysis-panel-row',
  extra: 'table-wrapper-extra-row',
} as const;
