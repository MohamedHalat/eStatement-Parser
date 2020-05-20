"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.euiContextMapping = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var euiContextMapping = {
  'euiBasicTable.selectAllRows': _i18n.i18n.translate('core.euiBasicTable.selectAllRows', {
    defaultMessage: 'Select all rows',
    description: 'ARIA and displayed label on a checkbox to select all table rows'
  }),
  'euiBasicTable.selectThisRow': _i18n.i18n.translate('core.euiBasicTable.selectThisRow', {
    defaultMessage: 'Select this row',
    description: 'ARIA and displayed label on a checkbox to select a single table row'
  }),
  'euiBasicTable.tableDescription': function euiBasicTableTableDescription(_ref) {
    var itemCount = _ref.itemCount;
    return _i18n.i18n.translate('core.euiBasicTable.tableDescription', {
      defaultMessage: 'Below is a table of {itemCount} items.',
      values: {
        itemCount: itemCount
      },
      description: 'Screen reader text to describe the size of a table'
    });
  },
  'euiBottomBar.screenReaderAnnouncement': _i18n.i18n.translate('core.euiBottomBar.screenReaderAnnouncement', {
    defaultMessage: 'There is a new menu opening with page level controls at the end of the document.',
    description: 'Screen reader announcement that functionality is available in the page document'
  }),
  'euiBreadcrumbs.collapsedBadge.ariaLabel': _i18n.i18n.translate('core.euiBreadcrumbs.collapsedBadge.ariaLabel', {
    defaultMessage: 'Show all breadcrumbs',
    description: 'Displayed when one or more breadcrumbs are hidden.'
  }),
  'euiCardSelect.select': _i18n.i18n.translate('core.euiCardSelect.select', {
    defaultMessage: 'Select',
    description: 'Displayed button text when a card option can be selected.'
  }),
  'euiCardSelect.selected': _i18n.i18n.translate('core.euiCardSelect.selected', {
    defaultMessage: 'Selected',
    description: 'Displayed button text when a card option is selected.'
  }),
  'euiCardSelect.unavailable': _i18n.i18n.translate('core.euiCardSelect.unavailable', {
    defaultMessage: 'Unavailable',
    description: 'Displayed button text when a card option is unavailable.'
  }),
  'euiCodeBlock.copyButton': _i18n.i18n.translate('core.euiCodeBlock.copyButton', {
    defaultMessage: 'Copy',
    description: 'ARIA label for a button that copies source code text to the clipboard'
  }),
  'euiCodeEditor.startEditing': _i18n.i18n.translate('core.euiCodeEditor.startEditing', {
    defaultMessage: 'Press Enter to start editing.'
  }),
  'euiCodeEditor.startInteracting': _i18n.i18n.translate('core.euiCodeEditor.startInteracting', {
    defaultMessage: 'Press Enter to start interacting with the code.'
  }),
  'euiCodeEditor.stopEditing': _i18n.i18n.translate('core.euiCodeEditor.stopEditing', {
    defaultMessage: "When you're done, press Escape to stop editing."
  }),
  'euiCodeEditor.stopInteracting': _i18n.i18n.translate('core.euiCodeEditor.stopInteracting', {
    defaultMessage: "When you're done, press Escape to stop interacting with the code."
  }),
  'euiCollapsedItemActions.allActions': _i18n.i18n.translate('core.euiCollapsedItemActions.allActions', {
    defaultMessage: 'All actions',
    description: 'ARIA label and tooltip content describing a button that expands an actions menu'
  }),
  'euiColorPicker.screenReaderAnnouncement': _i18n.i18n.translate('core.euiColorPicker.screenReaderAnnouncement', {
    defaultMessage: 'A popup with a range of selectable colors opened. Tab forward to cycle through colors choices or press escape to close this popup.',
    description: 'Message when the color picker popover is opened. Describes the interaction with the elements in the popover.'
  }),
  'euiColorPicker.swatchAriaLabel': function euiColorPickerSwatchAriaLabel(_ref2) {
    var swatch = _ref2.swatch;
    return _i18n.i18n.translate('core.euiColorPicker.swatchAriaLabel', {
      defaultMessage: 'Select {swatch} as the color',
      values: {
        swatch: swatch
      },
      description: 'Screen reader text to describe the action and hex value of the selectable option'
    });
  },
  'euiColorStopThumb.removeLabel': _i18n.i18n.translate('core.euiColorStopThumb.removeLabel', {
    defaultMessage: 'Remove this stop',
    description: 'Label accompanying a button whose action will remove the color stop'
  }),
  'euiColorStopThumb.screenReaderAnnouncement': _i18n.i18n.translate('core.euiColorStopThumb.screenReaderAnnouncement', {
    defaultMessage: 'A popup with a color stop edit form opened. Tab forward to cycle through form controls or press escape to close this popup.',
    description: 'Message when the color picker popover has opened for an individual color stop thumb.'
  }),
  'euiColorStops.screenReaderAnnouncement': function euiColorStopsScreenReaderAnnouncement(_ref3) {
    var label = _ref3.label,
        readOnly = _ref3.readOnly,
        disabled = _ref3.disabled;
    return _i18n.i18n.translate('core.euiColorStops.screenReaderAnnouncement', {
      defaultMessage: '{label}: {readOnly} {disabled} Color stop picker. Each stop consists of a number and corresponding color value. Use the Down and Up arrow keys to select individual stops. Press the Enter key to create a new stop.',
      values: {
        label: label,
        readOnly: readOnly,
        disabled: disabled
      },
      description: 'Screen reader text to describe the composite behavior of the color stops component.'
    });
  },
  'euiColumnSelector.hideAll': _i18n.i18n.translate('core.euiColumnSelector.hideAll', {
    defaultMessage: 'Hide all'
  }),
  'euiColumnSelector.selectAll': _i18n.i18n.translate('core.euiColumnSelector.selectAll', {
    defaultMessage: 'Show all'
  }),
  'euiColumnSorting.clearAll': _i18n.i18n.translate('core.euiColumnSorting.clearAll', {
    defaultMessage: 'Clear sorting'
  }),
  'euiColumnSorting.emptySorting': _i18n.i18n.translate('core.euiColumnSorting.emptySorting', {
    defaultMessage: 'Currently no fields are sorted'
  }),
  'euiColumnSorting.pickFields': _i18n.i18n.translate('core.euiColumnSorting.pickFields', {
    defaultMessage: 'Pick fields to sort by'
  }),
  'euiColumnSorting.sortFieldAriaLabel': _i18n.i18n.translate('core.euiColumnSorting.sortFieldAriaLabel', {
    defaultMessage: 'Sort by:'
  }),
  'euiColumnSortingDraggable.activeSortLabel': _i18n.i18n.translate('core.euiColumnSortingDraggable.activeSortLabel', {
    defaultMessage: 'is sorting this data grid'
  }),
  'euiColumnSortingDraggable.defaultSortAsc': _i18n.i18n.translate('core.euiColumnSortingDraggable.defaultSortAsc', {
    defaultMessage: 'A-Z',
    description: 'Ascending sort label'
  }),
  'euiColumnSortingDraggable.defaultSortDesc': _i18n.i18n.translate('core.euiColumnSortingDraggable.defaultSortDesc', {
    defaultMessage: 'Z-A',
    description: 'Descending sort label'
  }),
  'euiColumnSortingDraggable.removeSortLabel': _i18n.i18n.translate('core.euiColumnSortingDraggable.removeSortLabel', {
    defaultMessage: 'Remove from data grid sort:'
  }),
  'euiColumnSortingDraggable.toggleLegend': _i18n.i18n.translate('core.euiColumnSortingDraggable.toggleLegend', {
    defaultMessage: 'Select sorting method for field:'
  }),
  'euiComboBoxOptionsList.allOptionsSelected': _i18n.i18n.translate('core.euiComboBoxOptionsList.allOptionsSelected', {
    defaultMessage: "You've selected all available options"
  }),
  'euiComboBoxOptionsList.alreadyAdded': function euiComboBoxOptionsListAlreadyAdded(_ref4) {
    var label = _ref4.label;
    return _react.default.createElement(_react2.FormattedMessage, {
      id: "core.euiComboBoxOptionsList.alreadyAdded",
      defaultMessage: "{label} has already been added",
      values: {
        label: label
      }
    });
  },
  'euiComboBoxOptionsList.createCustomOption': function euiComboBoxOptionsListCreateCustomOption(_ref5) {
    var key = _ref5.key,
        searchValue = _ref5.searchValue;
    return _react.default.createElement(_react2.FormattedMessage, {
      id: "core.euiComboBoxOptionsList.createCustomOption",
      defaultMessage: "Hit {key} to add {searchValue} as a custom option",
      values: {
        key: key,
        searchValue: searchValue
      }
    });
  },
  'euiComboBoxOptionsList.loadingOptions': _i18n.i18n.translate('core.euiComboBoxOptionsList.loadingOptions', {
    defaultMessage: 'Loading options',
    description: 'Placeholder message while data is asynchronously loaded'
  }),
  'euiComboBoxOptionsList.noAvailableOptions': _i18n.i18n.translate('core.euiComboBoxOptionsList.noAvailableOptions', {
    defaultMessage: "There aren't any options available"
  }),
  'euiComboBoxOptionsList.noMatchingOptions': function euiComboBoxOptionsListNoMatchingOptions(_ref6) {
    var searchValue = _ref6.searchValue;
    return _react.default.createElement(_react2.FormattedMessage, {
      id: "core.euiComboBoxOptionsList.noMatchingOptions",
      defaultMessage: "{searchValue} doesn't match any options",
      values: {
        searchValue: searchValue
      }
    });
  },
  'euiComboBoxPill.removeSelection': function euiComboBoxPillRemoveSelection(_ref7) {
    var children = _ref7.children;
    return _i18n.i18n.translate('core.euiComboBoxPill.removeSelection', {
      defaultMessage: 'Remove {children} from selection in this group',
      values: {
        children: children
      },
      description: 'ARIA label, `children` is the human-friendly value of an option'
    });
  },
  'euiCommonlyUsedTimeRanges.legend': _i18n.i18n.translate('core.euiCommonlyUsedTimeRanges.legend', {
    defaultMessage: 'Commonly used'
  }),
  'euiDataGrid.screenReaderNotice': _i18n.i18n.translate('core.euiDataGrid.screenReaderNotice', {
    defaultMessage: 'Cell contains interactive content.'
  }),
  'euiDataGridCell.expandButtonTitle': _i18n.i18n.translate('core.euiDataGridCell.expandButtonTitle', {
    defaultMessage: 'Click or hit enter to interact with cell content'
  }),
  'euiDataGridSchema.booleanSortTextAsc': _i18n.i18n.translate('core.euiDataGridSchema.booleanSortTextAsc', {
    defaultMessage: 'True-False',
    description: 'Ascending boolean label'
  }),
  'euiDataGridSchema.booleanSortTextDesc': _i18n.i18n.translate('core.euiDataGridSchema.booleanSortTextDesc', {
    defaultMessage: 'False-True',
    description: 'Descending boolean label'
  }),
  'euiDataGridSchema.currencySortTextAsc': _i18n.i18n.translate('core.euiDataGridSchema.currencySortTextAsc', {
    defaultMessage: 'Low-High',
    description: 'Ascending currency label'
  }),
  'euiDataGridSchema.currencySortTextDesc': _i18n.i18n.translate('core.euiDataGridSchema.currencySortTextDesc', {
    defaultMessage: 'High-Low',
    description: 'Descending currency label'
  }),
  'euiDataGridSchema.dateSortTextAsc': _i18n.i18n.translate('core.euiDataGridSchema.dateSortTextAsc', {
    defaultMessage: 'New-Old',
    description: 'Ascending date label'
  }),
  'euiDataGridSchema.dateSortTextDesc': _i18n.i18n.translate('core.euiDataGridSchema.dateSortTextDesc', {
    defaultMessage: 'Old-New',
    description: 'Descending date label'
  }),
  'euiDataGridSchema.numberSortTextAsc': _i18n.i18n.translate('core.euiDataGridSchema.numberSortTextAsc', {
    defaultMessage: 'Low-High',
    description: 'Ascending number label'
  }),
  'euiDataGridSchema.numberSortTextDesc': _i18n.i18n.translate('core.euiDataGridSchema.numberSortTextDesc', {
    defaultMessage: 'High-Low',
    description: 'Descending number label'
  }),
  'euiDataGridSchema.jsonSortTextAsc': _i18n.i18n.translate('core.euiDataGridSchema.jsonSortTextAsc', {
    defaultMessage: 'Small-Large',
    description: 'Ascending size label'
  }),
  'euiDataGridSchema.jsonSortTextDesc': _i18n.i18n.translate('core.euiDataGridSchema.jsonSortTextDesc', {
    defaultMessage: 'Large-Small',
    description: 'Descending size label'
  }),
  'euiFilterButton.filterBadge': function euiFilterButtonFilterBadge(_ref8) {
    var count = _ref8.count,
        hasActiveFilters = _ref8.hasActiveFilters;
    return _i18n.i18n.translate('core.euiFilterButton.filterBadge', {
      defaultMessage: '${count} ${filterCountLabel} filters',
      values: {
        count: count,
        filterCountLabel: hasActiveFilters ? 'active' : 'available'
      }
    });
  },
  'euiForm.addressFormErrors': _i18n.i18n.translate('core.euiForm.addressFormErrors', {
    defaultMessage: 'Please address the errors in your form.'
  }),
  'euiFormControlLayoutClearButton.label': _i18n.i18n.translate('core.euiFormControlLayoutClearButton.label', {
    defaultMessage: 'Clear input',
    description: 'ARIA label on a button that removes any entry in a form field'
  }),
  'euiHeaderAlert.dismiss': _i18n.i18n.translate('core.euiHeaderAlert.dismiss', {
    defaultMessage: 'Dismiss',
    description: 'ARIA label on a button that dismisses/removes a notification'
  }),
  'euiHeaderLinks.appNavigation': _i18n.i18n.translate('core.euiHeaderLinks.appNavigation', {
    defaultMessage: 'App navigation',
    description: 'ARIA label on a `nav` element'
  }),
  'euiHeaderLinks.openNavigationMenu': _i18n.i18n.translate('core.euiHeaderLinks.openNavigationMenu', {
    defaultMessage: 'Open navigation menu'
  }),
  'euiHue.label': _i18n.i18n.translate('core.euiHue.label', {
    defaultMessage: 'Select the HSV color mode "hue" value'
  }),
  'euiImage.closeImage': function euiImageCloseImage(_ref9) {
    var alt = _ref9.alt;
    return _i18n.i18n.translate('core.euiImage.closeImage', {
      defaultMessage: 'Close full screen {alt} image',
      values: {
        alt: alt
      }
    });
  },
  'euiImage.openImage': function euiImageOpenImage(_ref10) {
    var alt = _ref10.alt;
    return _i18n.i18n.translate('core.euiImage.openImage', {
      defaultMessage: 'Open full screen {alt} image',
      values: {
        alt: alt
      }
    });
  },
  'euiLink.external.ariaLabel': _i18n.i18n.translate('core.euiLink.external.ariaLabel', {
    defaultMessage: 'External link'
  }),
  'euiModal.closeModal': _i18n.i18n.translate('core.euiModal.closeModal', {
    defaultMessage: 'Closes this modal window'
  }),
  'euiPagination.jumpToLastPage': function euiPaginationJumpToLastPage(_ref11) {
    var pageCount = _ref11.pageCount;
    return _i18n.i18n.translate('core.euiPagination.jumpToLastPage', {
      defaultMessage: 'Jump to the last page, number {pageCount}',
      values: {
        pageCount: pageCount
      }
    });
  },
  'euiPagination.nextPage': _i18n.i18n.translate('core.euiPagination.nextPage', {
    defaultMessage: 'Next page'
  }),
  'euiPagination.pageOfTotal': function euiPaginationPageOfTotal(_ref12) {
    var page = _ref12.page,
        total = _ref12.total;
    return _i18n.i18n.translate('core.euiPagination.pageOfTotal', {
      defaultMessage: 'Page {page} of {total}',
      values: {
        page: page,
        total: total
      }
    });
  },
  'euiPagination.previousPage': _i18n.i18n.translate('core.euiPagination.previousPage', {
    defaultMessage: 'Previous page'
  }),
  'euiPopover.screenReaderAnnouncement': _i18n.i18n.translate('core.euiPopover.screenReaderAnnouncement', {
    defaultMessage: 'You are in a dialog. To close this dialog, hit escape.'
  }),
  'euiQuickSelect.applyButton': _i18n.i18n.translate('core.euiQuickSelect.applyButton', {
    defaultMessage: 'Apply'
  }),
  'euiQuickSelect.fullDescription': function euiQuickSelectFullDescription(_ref13) {
    var timeTense = _ref13.timeTense,
        timeValue = _ref13.timeValue,
        timeUnit = _ref13.timeUnit;
    return _i18n.i18n.translate('core.euiQuickSelect.fullDescription', {
      defaultMessage: 'Currently set to {timeTense} {timeValue} {timeUnit}.',
      values: {
        timeTense: timeTense,
        timeValue: timeValue,
        timeUnit: timeUnit
      }
    });
  },
  'euiQuickSelect.legendText': _i18n.i18n.translate('core.euiQuickSelect.legendText', {
    defaultMessage: 'Quick select a time range'
  }),
  'euiQuickSelect.nextLabel': _i18n.i18n.translate('core.euiQuickSelect.nextLabel', {
    defaultMessage: 'Next time window'
  }),
  'euiQuickSelect.previousLabel': _i18n.i18n.translate('core.euiQuickSelect.previousLabel', {
    defaultMessage: 'Previous time window'
  }),
  'euiQuickSelect.quickSelectTitle': _i18n.i18n.translate('core.euiQuickSelect.quickSelectTitle', {
    defaultMessage: 'Quick select'
  }),
  'euiQuickSelect.tenseLabel': _i18n.i18n.translate('core.euiQuickSelect.tenseLabel', {
    defaultMessage: 'Time tense'
  }),
  'euiQuickSelect.unitLabel': _i18n.i18n.translate('core.euiQuickSelect.unitLabel', {
    defaultMessage: 'Time unit'
  }),
  'euiQuickSelect.valueLabel': _i18n.i18n.translate('core.euiQuickSelect.valueLabel', {
    defaultMessage: 'Time value'
  }),
  'euiRefreshInterval.fullDescription': function euiRefreshIntervalFullDescription(_ref14) {
    var optionValue = _ref14.optionValue,
        optionText = _ref14.optionText;
    return _i18n.i18n.translate('core.euiRefreshInterval.fullDescription', {
      defaultMessage: 'Currently set to {optionValue} {optionText}.',
      values: {
        optionValue: optionValue,
        optionText: optionText
      }
    });
  },
  'euiRefreshInterval.legend': _i18n.i18n.translate('core.euiRefreshInterval.legend', {
    defaultMessage: 'Refresh every'
  }),
  'euiRefreshInterval.start': _i18n.i18n.translate('core.euiRefreshInterval.start', {
    defaultMessage: 'Start'
  }),
  'euiRefreshInterval.stop': _i18n.i18n.translate('core.euiRefreshInterval.stop', {
    defaultMessage: 'Stop'
  }),
  'euiRelativeTab.fullDescription': function euiRelativeTabFullDescription(_ref15) {
    var unit = _ref15.unit;
    return _i18n.i18n.translate('core.euiRelativeTab.fullDescription', {
      defaultMessage: 'The unit is changeable. Currently set to {unit}.',
      values: {
        unit: unit
      }
    });
  },
  'euiRelativeTab.relativeDate': function euiRelativeTabRelativeDate(_ref16) {
    var position = _ref16.position;
    return _i18n.i18n.translate('core.euiRelativeTab.relativeDate', {
      defaultMessage: '{position} date',
      values: {
        position: position
      }
    });
  },
  'euiRelativeTab.roundingLabel': function euiRelativeTabRoundingLabel(_ref17) {
    var unit = _ref17.unit;
    return _i18n.i18n.translate('core.euiRelativeTab.roundingLabel', {
      defaultMessage: 'Round to the {unit}',
      values: {
        unit: unit
      }
    });
  },
  'euiRelativeTab.unitInputLabel': _i18n.i18n.translate('core.euiRelativeTab.unitInputLabel', {
    defaultMessage: 'Relative time span'
  }),
  'euiSaturation.roleDescription': _i18n.i18n.translate('core.euiSaturation.roleDescription', {
    defaultMessage: 'HSV color mode saturation and value selection'
  }),
  'euiSaturation.screenReaderAnnouncement': _i18n.i18n.translate('core.euiSaturation.screenReaderAnnouncement', {
    defaultMessage: 'Use the arrow keys to navigate the square color gradient. The coordinates resulting from each key press will be used to calculate HSV color mode "saturation" and "value" numbers, in the range of 0 to 1. Left and right decrease and increase (respectively) the "saturation" value. Up and down decrease and increase (respectively) the "value" value.'
  }),
  'euiSelectable.loadingOptions': _i18n.i18n.translate('core.euiSelectable.loadingOptions', {
    defaultMessage: 'Loading options',
    description: 'Placeholder message while data is asynchronously loaded'
  }),
  'euiSelectable.noAvailableOptions': _i18n.i18n.translate('core.euiSelectable.noAvailableOptions', {
    defaultMessage: "There aren't any options available"
  }),
  'euiSelectable.noMatchingOptions': function euiSelectableNoMatchingOptions(_ref18) {
    var searchValue = _ref18.searchValue;
    return _react.default.createElement(_react2.FormattedMessage, {
      id: "core.euiSelectable.noMatchingOptions",
      defaultMessage: "{searchValue} doesn't match any options",
      values: {
        searchValue: searchValue
      }
    });
  },
  'euiStat.loadingText': _i18n.i18n.translate('core.euiStat.loadingText', {
    defaultMessage: 'Statistic is loading'
  }),
  'euiStep.ariaLabel': function euiStepAriaLabel(_ref19) {
    var status = _ref19.status;
    return _i18n.i18n.translate('core.euiStep.ariaLabel', {
      defaultMessage: '{stepStatus}',
      values: {
        stepStatus: status === 'incomplete' ? 'Incomplete Step' : 'Step'
      }
    });
  },
  'euiStepHorizontal.buttonTitle': function euiStepHorizontalButtonTitle(_ref20) {
    var step = _ref20.step,
        title = _ref20.title,
        disabled = _ref20.disabled,
        isComplete = _ref20.isComplete;
    return _i18n.i18n.translate('core.euiStepHorizontal.buttonTitle', {
      defaultMessage: 'Step {step}: {title}{titleAppendix}',
      values: {
        step: step,
        title: title,
        titleAppendix: disabled ? ' is disabled' : isComplete ? ' is complete' : ''
      }
    });
  },
  'euiStepHorizontal.step': _i18n.i18n.translate('core.euiStepHorizontal.step', {
    defaultMessage: 'Step',
    description: 'Screen reader text announcing information about a step in some process'
  }),
  'euiStepNumber.hasErrors': _i18n.i18n.translate('core.euiStepNumber.hasErrors', {
    defaultMessage: 'has errors',
    description: 'Used as the title attribute on an image or svg icon to indicate a given process step has errors'
  }),
  'euiStepNumber.hasWarnings': _i18n.i18n.translate('core.euiStepNumber.hasWarnings', {
    defaultMessage: 'has warnings',
    description: 'Used as the title attribute on an image or svg icon to indicate a given process step has warnings'
  }),
  'euiStepNumber.isComplete': _i18n.i18n.translate('core.euiStepNumber.isComplete', {
    defaultMessage: 'complete',
    description: 'Used as the title attribute on an image or svg icon to indicate a given process step is complete'
  }),
  'euiStyleSelector.buttonText': _i18n.i18n.translate('core.euiStyleSelector.buttonText', {
    defaultMessage: 'Density'
  }),
  'euiSuperDatePicker.showDatesButtonLabel': _i18n.i18n.translate('core.euiSuperDatePicker.showDatesButtonLabel', {
    defaultMessage: 'Show dates',
    description: 'Displayed in a button that shows date picker'
  }),
  'euiSuperSelect.screenReaderAnnouncement': function euiSuperSelectScreenReaderAnnouncement(_ref21) {
    var optionsCount = _ref21.optionsCount;
    return _i18n.i18n.translate('core.euiSuperSelect.screenReaderAnnouncement', {
      defaultMessage: 'You are in a form selector of {optionsCount} items and must select a single option. Use the Up and Down keys to navigate or Escape to close.',
      values: {
        optionsCount: optionsCount
      }
    });
  },
  'euiSuperSelectControl.selectAnOption': function euiSuperSelectControlSelectAnOption(_ref22) {
    var selectedValue = _ref22.selectedValue;
    return _i18n.i18n.translate('core.euiSuperSelectControl.selectAnOption', {
      defaultMessage: 'Select an option: {selectedValue}, is selected',
      values: {
        selectedValue: selectedValue
      }
    });
  },
  'euiSuperUpdateButton.cannotUpdateTooltip': _i18n.i18n.translate('core.euiSuperUpdateButton.cannotUpdateTooltip', {
    defaultMessage: 'Cannot update',
    description: "Displayed in a tooltip when updates can't happen"
  }),
  'euiSuperUpdateButton.clickToApplyTooltip': _i18n.i18n.translate('core.euiSuperUpdateButton.clickToApplyTooltip', {
    defaultMessage: 'Click to apply',
    description: "Displayed in a tooltip when there are changes that haven't been applied"
  }),
  'euiSuperUpdateButton.refreshButtonLabel': _i18n.i18n.translate('core.euiSuperUpdateButton.refreshButtonLabel', {
    defaultMessage: 'Refresh',
    description: 'Displayed in a button that refreshes based on date picked'
  }),
  'euiSuperUpdateButton.updatingButtonLabel': _i18n.i18n.translate('core.euiSuperUpdateButton.updatingButtonLabel', {
    defaultMessage: 'Updating',
    description: 'Displayed in a button that refreshes when updates are happening'
  }),
  'euiSuperUpdateButton.updateButtonLabel': _i18n.i18n.translate('core.euiSuperUpdateButton.updateButtonLabel', {
    defaultMessage: 'Update',
    description: 'Displayed in a button that updates based on date picked'
  }),
  'euiTablePagination.rowsPerPage': _i18n.i18n.translate('core.euiTablePagination.rowsPerPage', {
    defaultMessage: 'Rows per page',
    description: 'Displayed in a button that toggles a table pagination menu'
  }),
  'euiTablePagination.rowsPerPageOption': function euiTablePaginationRowsPerPageOption(_ref23) {
    var rowsPerPage = _ref23.rowsPerPage;
    return _i18n.i18n.translate('core.euiTablePagination.rowsPerPageOption', {
      defaultMessage: '{rowsPerPage} rows',
      description: 'Displayed in a button that toggles the number of visible rows',
      values: {
        rowsPerPage: rowsPerPage
      }
    });
  },
  'euiTableSortMobile.sorting': _i18n.i18n.translate('core.euiTableSortMobile.sorting', {
    defaultMessage: 'Sorting',
    description: 'Displayed in a button that toggles a table sorting menu'
  }),
  'euiToast.dismissToast': _i18n.i18n.translate('core.euiToast.dismissToast', {
    defaultMessage: 'Dismiss toast'
  }),
  'euiToast.newNotification': _i18n.i18n.translate('core.euiToast.newNotification', {
    defaultMessage: 'A new notification appears'
  }),
  'euiToast.notification': _i18n.i18n.translate('core.euiToast.notification', {
    defaultMessage: 'Notification',
    description: 'ARIA label on an element containing a notification'
  }),
  'euiTreeView.ariaLabel': function euiTreeViewAriaLabel(_ref24) {
    var nodeLabel = _ref24.nodeLabel,
        ariaLabel = _ref24.ariaLabel;
    return _i18n.i18n.translate('core.euiTreeView.ariaLabel', {
      defaultMessage: '{nodeLabel} child of {ariaLabel}',
      values: {
        nodeLabel: nodeLabel,
        ariaLabel: ariaLabel
      }
    });
  },
  'euiTreeView.listNavigationInstructions': _i18n.i18n.translate('core.euiTreeView.listNavigationInstructions', {
    defaultMessage: 'You can quickly navigate this list using arrow keys.'
  })
};
exports.euiContextMapping = euiContextMapping;