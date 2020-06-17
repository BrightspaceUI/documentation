import '@brightspace-ui/core/components/colors/colors.js';
import { css } from 'lit-element/lit-element.js';

export const tableStyles = css`
	.d2l-table {
		background-color:transparent;
		border-collapse:separate!important;
		border-spacing:0;
		display:table;
		font-size: 0.8rem;
		font-weight: 400;
		width:100%;
	}
	.d2l-table > thead,
	d2l-thead {
		display:table-header-group;
	}
	.d2l-table > tfoot,
	d2l-tfoot {
		display:table-footer-group;
		background-color:var(--d2l-table-body-background-color);
	}
	.d2l-table > tbody,
	d2l-tbody {
		display: table-row-group;
		background-color:var(--d2l-table-body-background-color);
	}
	.d2l-table > * > tr,
	d2l-tr {
		display:table-row;
	}
	d2l-table-wrapper[type="default"] .d2l-table > * > tr > td,
	d2l-table-wrapper[type="default"] .d2l-table > * > tr > th,
	d2l-table[type="default"] d2l-td,
	d2l-table[type="default"] d2l-th {
		display:table-cell;
		vertical-align:middle;
		padding: 0.5rem 1rem;
		height: 41px; /* min-height to be 62px including border */
		border-top:var(--d2l-table-border);
		border-right:var(--d2l-table-border);
		font-weight: inherit;
		text-align: left;
	}
	d2l-table-wrapper[type="default"] .d2l-table-cell-first,
	d2l-table[type="default"] .d2l-table-cell-first,
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table-cell-last,
	[dir="rtl"] d2l-table[type="default"] .d2l-table-cell-last {
		border-left: var(--d2l-table-border);
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table-cell-first:not(.d2l-table-cell-last),
	[dir="rtl"] d2l-table[type="default"] .d2l-table-cell-first:not(.d2l-table-cell-last) {
		border-left: 0;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table > * > tr > td,
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table > * > tr > th,
	[dir="rtl"] d2l-table[type="default"] d2l-td,
	[dir="rtl"] d2l-table[type="default"] d2l-th {
		text-align: right;
	}
	d2l-table-wrapper[type="default"] .d2l-table > thead > tr > th,
	d2l-table-wrapper[type="default"] .d2l-table > * > tr[header] > th,
	d2l-table[type="default"] d2l-thead > d2l-tr > d2l-th,
	d2l-table[type="default"] d2l-tr[header] > d2l-th {
		font-family: inherit;
		color:var(--d2l-color-ferrite);
		font-size:.7rem;
		line-height:1rem;
		margin:1rem 0;
		padding: 0.5rem 1rem;
		height: 27px; /* min-height to be 48px including border */
		background-color:var(--d2l-table-header-background-color);
	}
	/* border radiuses */
	d2l-table-wrapper[type="default"] .d2l-table-row-first > .d2l-table-cell-first,
	d2l-table[type="default"] .d2l-table-row-first > .d2l-table-cell-first {
		border-top-left-radius: var(--d2l-table-border-radius);
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table-row-first > .d2l-table-cell-first:not(.d2l-table-cell-last),
	[dir="rtl"] d2l-table[type="default"] .d2l-table-row-first > .d2l-table-cell-first:not(.d2l-table-cell-last) {
		border-top-left-radius: 0;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table-row-first > .d2l-table-cell-first,
	[dir="rtl"] d2l-table[type="default"] .d2l-table-row-first > .d2l-table-cell-first {
		border-top-right-radius: var(--d2l-table-border-radius);
	}
	d2l-table-wrapper[type="default"] .d2l-table-row-first > .d2l-table-cell-last,
	d2l-table[type="default"] .d2l-table-row-first > .d2l-table-cell-last {
		border-top-right-radius: var(--d2l-table-border-radius);
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table-row-first > .d2l-table-cell-last:not(.d2l-table-cell-first),
	[dir="rtl"] d2l-table[type="default"] .d2l-table-row-first > .d2l-table-cell-last:not(.d2l-table-cell-first) {
		border-top-right-radius: 0;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table-row-first > .d2l-table-cell-last,
	[dir="rtl"] d2l-table[type="default"] .d2l-table-row-first > .d2l-table-cell-last {
		border-top-left-radius: var(--d2l-table-border-radius);
	}
	d2l-table-wrapper[type="default"] .d2l-table-row-last > .d2l-table-cell-first,
	d2l-table[type="default"] .d2l-table-row-last > .d2l-table-cell-first {
		border-bottom-left-radius: var(--d2l-table-border-radius);
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table-row-last > .d2l-table-cell-first:not(.d2l-table-cell-last),
	[dir="rtl"] d2l-table[type="default"] .d2l-table-row-last > .d2l-table-cell-first:not(.d2l-table-cell-last) {
		border-bottom-left-radius: 0;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table-row-last > .d2l-table-cell-first,
	[dir="rtl"] d2l-table[type="default"] .d2l-table-row-last > .d2l-table-cell-first {
		border-bottom-right-radius: var(--d2l-table-border-radius);
	}
	d2l-table-wrapper[type="default"] .d2l-table-row-last > .d2l-table-cell-last,
	d2l-table[type="default"] .d2l-table-row-last > .d2l-table-cell-last {
		border-bottom-right-radius: var(--d2l-table-border-radius);
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table-row-last > .d2l-table-cell-last:not(.d2l-table-cell-first),
	[dir="rtl"] d2l-table[type="default"] .d2l-table-row-last > .d2l-table-cell-last:not(.d2l-table-cell-first) {
		border-bottom-right-radius: 0;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table-row-last > .d2l-table-cell-last,
	[dir="rtl"] d2l-table[type="default"] .d2l-table-row-last > .d2l-table-cell-last {
		border-bottom-left-radius: var(--d2l-table-border-radius);
	}
	d2l-table-wrapper[type="default"] .d2l-table-row-last > *,
	d2l-table[type="default"] .d2l-table-row-last > * {
		border-bottom: var(--d2l-table-border);
	}
	/* active rows or un-selected hover rows */
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[active],
	d2l-table-wrapper[type="default"] .d2l-table[selectable] > tbody > tr:not([selected]):hover,
	d2l-table[type="default"] d2l-tbody > d2l-tr[active],
	d2l-table[type="default"][selectable] d2l-tbody > d2l-tr:not([selected]):hover {
		background-color: var(--d2l-table-row-background-color-active);
	}
	/* selected rows */
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[selected],
	d2l-table[type="default"] d2l-tbody > d2l-tr[selected] {
		background-color: var(--d2l-table-row-background-color-selected);
	}
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[selected] > .d2l-table-cell-last,
	d2l-table[type="default"] d2l-tbody > d2l-tr[selected] > .d2l-table-cell-last,
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[selected] > .d2l-table-cell-first,
	[dir="rtl"] d2l-table[type="default"] d2l-tbody > d2l-tr[selected] > .d2l-table-cell-first {
		border-right-color: var(--d2l-table-row-border-color-selected);
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[selected] > .d2l-table-cell-last,
	[dir="rtl"] d2l-table[type="default"] d2l-tbody > d2l-tr[selected] > .d2l-table-cell-last {
		border-right-color: var(--d2l-table-border-color);
	}
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[selected] > .d2l-table-cell-first,
	d2l-table[type="default"] d2l-tbody > d2l-tr[selected] > .d2l-table-cell-first,
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[selected] > .d2l-table-cell-last,
	[dir="rtl"] d2l-table[type="default"] d2l-tbody > d2l-tr[selected] > .d2l-table-cell-last {
		border-left-color: var(--d2l-table-row-border-color-selected);
	}
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[selected] > td,
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[selected] > th,
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[selected] + tr > td,
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[selected] + tr > th,
	d2l-table[type="default"] d2l-tbody > d2l-tr[selected] > d2l-td,
	d2l-table[type="default"] d2l-tbody > d2l-tr[selected] > d2l-th,
	d2l-table[type="default"] d2l-tbody > d2l-tr[selected] + d2l-tr > d2l-td,
	d2l-table[type="default"] d2l-tbody > d2l-tr[selected] + d2l-tr > d2l-th {
		border-top-color: var(--d2l-table-row-border-color-selected);
	}
	d2l-table-wrapper[type="default"] .d2l-table-row-last[selected] > td,
	d2l-table-wrapper[type="default"] .d2l-table-row-last[selected] > th,
	d2l-table[type="default"] .d2l-table-row-last[selected] > d2l-td,
	d2l-table[type="default"] .d2l-table-row-last[selected] > d2l-th {
		border-bottom-color:var(--d2l-table-row-border-color-selected);
	}
	/* active + selected rows */
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[active][selected],
	d2l-table-wrapper[type="default"] .d2l-table[selectable] > tbody > tr[selected]:hover,
	d2l-table[type="default"] d2l-tbody > d2l-tr[active][selected],
	d2l-table[type="default"][selectable] d2l-tbody > d2l-tr[selected]:hover {
		background-color:var(--d2l-table-row-background-color-active-selected);
	}
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[active][selected] > .d2l-table-cell-last,
	d2l-table[type="default"] d2l-tbody > d2l-tr[active][selected] > .d2l-table-cell-last,
	d2l-table-wrapper[type="default"] .d2l-table[selectable] > tbody > tr[selected]:hover > .d2l-table-cell-last,
	d2l-table[type="default"][selectable] d2l-tbody > d2l-tr[selected]:hover > .d2l-table-cell-last,
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[active][selected] > .d2l-table-cell-first,
	[dir="rtl"] d2l-table[type="default"] d2l-tbody > d2l-tr[active][selected] > .d2l-table-cell-first,
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table[selectable] > tbody > tr[selected]:hover > .d2l-table-cell-first,
	[dir="rtl"] d2l-table[type="default"][selectable] d2l-tbody > d2l-tr[selected]:hover > .d2l-table-cell-first {
		border-right-color: var(--d2l-table-row-border-color-active-selected);
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[active][selected] > .d2l-table-cell-last,
	[dir="rtl"] d2l-table[type="default"] d2l-tbody > d2l-tr[active][selected] > .d2l-table-cell-last,
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table[selectable] > tbody > tr[selected]:hover > .d2l-table-cell-last,
	[dir="rtl"] d2l-table[type="default"][selectable] d2l-tbody > d2l-tr[selected]:hover > .d2l-table-cell-last {
		border-right-color: var(--d2l-table-border-color);
	}
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[active][selected] > .d2l-table-cell-first,
	d2l-table[type="default"] d2l-tbody > d2l-tr[active][selected] > .d2l-table-cell-first,
	d2l-table-wrapper[type="default"] .d2l-table[selectable] > tbody > tr[selected]:hover > .d2l-table-cell-first,
	d2l-table[type="default"][selectable] d2l-tbody > d2l-tr[selected]:hover > .d2l-table-cell-first,
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table[selectable] > tbody > tr[selected]:hover > .d2l-table-cell-last,
	[dir="rtl"] d2l-table[type="default"] d2l-tbody > d2l-tr[active][selected] > .d2l-table-cell-last,
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[active][selected] > .d2l-table-cell-last,
	[dir="rtl"] d2l-table[type="default"][selectable] d2l-tbody > d2l-tr[selected]:hover > .d2l-table-cell-last {
		border-left-color: var(--d2l-table-row-border-color-active-selected);
	}
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[active][selected] > td,
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[active][selected] > th,
	d2l-table-wrapper[type="default"] .d2l-table[selectable] > tbody > tr[selected]:hover > td,
	d2l-table-wrapper[type="default"] .d2l-table[selectable] > tbody > tr[selected]:hover > th,
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[active][selected] + tr > td,
	d2l-table-wrapper[type="default"] .d2l-table > tbody > tr[active][selected] + tr > th,
	d2l-table-wrapper[type="default"] .d2l-table[selectable] > tbody > tr[selected]:hover + tr > td,
	d2l-table-wrapper[type="default"] .d2l-table[selectable] > tbody > tr[selected]:hover + tr > th,
	d2l-table[type="default"] d2l-tbody > d2l-tr[active][selected] > d2l-td,
	d2l-table[type="default"] d2l-tbody > d2l-tr[active][selected] > d2l-th,
	d2l-table[type="default"][selectable] d2l-tbody > d2l-tr[selected]:hover > d2l-td,
	d2l-table[type="default"][selectable] d2l-tbody > d2l-tr[selected]:hover > d2l-th,
	d2l-table[type="default"] d2l-tbody > d2l-tr[active][selected] + d2l-tr > d2l-td,
	d2l-table[type="default"] d2l-tbody > d2l-tr[active][selected] + d2l-tr > d2l-th,
	d2l-table[type="default"][selectable] d2l-tbody > d2l-tr[selected]:hover + d2l-tr > d2l-td,
	d2l-table[type="default"][selectable] d2l-tbody > d2l-tr[selected]:hover + d2l-tr > d2l-th {
		border-top-color:var(--d2l-table-row-border-color-active-selected);
	}
	d2l-table-wrapper[type="default"] .d2l-table-row-last[active][selected] > td,
	d2l-table-wrapper[type="default"] .d2l-table-row-last[active][selected] > th,
	d2l-table[type="default"] .d2l-table-row-last[active][selected] > d2l-td,
	d2l-table[type="default"] .d2l-table-row-last[active][selected] > d2l-th,
	d2l-table-wrapper[type="default"] .d2l-table[selectable] > tbody > .d2l-table-row-last[selected]:hover > td,
	d2l-table-wrapper[type="default"] .d2l-table[selectable] > tbody > .d2l-table-row-last[selected]:hover > th,
	d2l-table[type="default"][selectable] d2l-tbody > .d2l-table-row-last[selected]:hover > d2l-td,
	d2l-table[type="default"][selectable] d2l-tbody > .d2l-table-row-last[selected]:hover > d2l-th {
		border-bottom-color:var(--d2l-table-row-border-color-active-selected);
	}
	/* no-column-border */
	d2l-table-wrapper[type="default"] .d2l-table[no-column-border] > tbody > tr > td:not(.d2l-table-cell-last),
	d2l-table-wrapper[type="default"] .d2l-table[no-column-border] > tbody > tr > th:not(.d2l-table-cell-last),
	d2l-table[type="default"][no-column-border] d2l-tbody > d2l-tr > d2l-td:not(.d2l-table-cell-last),
	d2l-table[type="default"][no-column-border] d2l-tbody > d2l-tr > d2l-th:not(.d2l-table-cell-last) {
		border-right: none;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table[no-column-border] > tbody > tr > .d2l-table-cell-last,
	[dir="rtl"] d2l-table[type="default"][no-column-border] d2l-tbody > d2l-tr > .d2l-table-cell-last {
		border-right: none;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"] .d2l-table[no-column-border] > tbody > tr > .d2l-table-cell-first,
	[dir="rtl"] d2l-table[type="default"][no-column-border] d2l-tbody > d2l-tr > .d2l-table-cell-first {
		border-right: var(--d2l-table-border);
	}
	/* sticky-headers */
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] table {
		padding-left: 20px;
	}
	d2l-table-wrapper[type="default"][sticky-headers] tr {
		background-color: inherit;
	}
	d2l-table-wrapper[type="default"][sticky-headers] tr[header] th,
	d2l-table-wrapper[type="default"][sticky-headers] thead tr th {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
	}
	d2l-table-wrapper[type="default"][sticky-headers] tr[header] th,
	d2l-table-wrapper[type="default"][sticky-headers] thead tr th {
		border-bottom: var(--d2l-table-border);
	}
	d2l-table-wrapper[type="default"][sticky-headers] td[sticky].d2l-table-cell-first,
	d2l-table-wrapper[type="default"][sticky-headers] th[sticky].d2l-table-cell-first,
	d2l-table-wrapper[type="default"][sticky-headers] td[sticky]:first-child,
	d2l-table-wrapper[type="default"][sticky-headers] th[sticky]:first-child {
		left: -5px;
	}
	d2l-table-wrapper[type="default"][sticky-headers] tr[header] + tr[header] [sticky].d2l-table-cell-first,
	d2l-table-wrapper[type="default"][sticky-headers] thead tr + tr [sticky]:first-child {
		left: 0;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] td[sticky].d2l-table-cell-first,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] th[sticky].d2l-table-cell-first,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] td[sticky]:first-child,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] th[sticky]:first-child {
		right: -5px;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] tr[header] + tr[header] [sticky].d2l-table-cell-first,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] thead tr + tr [sticky]:first-child {
		right: 0;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] tr[header]:not(.d2l-table-row-first) th,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] tr[header]:not(.d2l-table-row-first) td,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] thead tr:not(:first-child) th {
		border-left: var(--d2l-table-border);
	}
	d2l-table-wrapper[type="default"][sticky-headers] tr[header]:not(.d2l-table-row-first) th,
	d2l-table-wrapper[type="default"][sticky-headers] tr[header]:not(.d2l-table-row-first) td,
	d2l-table-wrapper[type="default"][sticky-headers] thead tr:not(:first-child) th {
		position: -webkit-sticky;
		position: sticky;
		top: -5px;
		border-left: none;
		border-top: none;
	}
	d2l-table-wrapper[type="default"][sticky-headers] tr[header]:not(.d2l-table-row-first) th,
	d2l-table-wrapper[type="default"][sticky-headers] tr[header]:not(.d2l-table-row-first) td,
	d2l-table-wrapper[type="default"][sticky-headers] thead tr:not(:first-child) th {
		border-bottom: var(--d2l-table-border);
	}
	d2l-table-wrapper[type="default"][sticky-headers] tr[header] th,
	d2l-table-wrapper[type="default"][sticky-headers] tr[header] td,
	d2l-table-wrapper[type="default"][sticky-headers] thead tr th {
		position: -webkit-sticky;
		position: sticky;
		top: -5px;
	}
	d2l-table-wrapper[type="default"][sticky-headers] tbody tr:not([header]) td,
	d2l-table-wrapper[type="default"][sticky-headers] tbody tr:not([header]) th {
		border-top: var(--d2l-table-border);
		border-bottom: none;
	}
	d2l-table-wrapper[type="default"][sticky-headers] tr[header] + tr:not([header]) td,
	d2l-table-wrapper[type="default"][sticky-headers] tr[header] + tr:not([header]) th,
	d2l-table-wrapper[type="default"][sticky-headers] tbody tr:not([header]):not([selected]):first-child td,
	d2l-table-wrapper[type="default"][sticky-headers] tbody tr:not([header]):not([selected]):first-child th  {
		border-top: none;
		border-bottom: none;
	}
	d2l-table-wrapper[type="default"][sticky-headers] .d2l-table > thead > tr[header] + tr:not([header])[selected] > td,
	d2l-table-wrapper[type="default"][sticky-headers] .d2l-table > tbody > tr[header] + tr:not([header])[selected] > td,
	d2l-table-wrapper[type="default"][sticky-headers] tr[header] + tr:not([header])[selected] th,
	d2l-table-wrapper[type="default"][sticky-headers] tbody tr[selected]:first-child td,
	d2l-table-wrapper[type="default"][sticky-headers] tbody tr[selected]:first-child th {
		border-top: var(--d2l-table-border);
		border-top-color: var(--d2l-table-row-border-color-selected);
	}
	d2l-table-wrapper[type="default"][sticky-headers] tr[header] th[sticky],
	d2l-table-wrapper[type="default"][sticky-headers] tr[header] td[sticky],
	d2l-table-wrapper[type="default"][sticky-headers] thead > tr > th[sticky] {
		z-index: 3;
		left: 0;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] th[sticky],
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] td[sticky] {
		right: 0;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table-cell-last {
		border-left: none;
	}
	d2l-table-wrapper[type="default"][sticky-headers] tbody :not([header]) [sticky] {
		position: -webkit-sticky;
		position: sticky;
		left: 0;
		z-index: 1;
		background-color: inherit;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table > thead > tr > td,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table > tbody > tr > td,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table th {
		border-left: var(--d2l-table-border);
		border-right: none;
	}
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table [selected] .d2l-table-cell-last,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table > thead > tr[selected] > td:last-child,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table > tbody > tr[selected] > td:last-child {
		border-left: var(--d2l-table-border);
		border-left-color: var(--d2l-table-row-border-color-selected);
	}
	d2l-table-wrapper[type="default"][sticky-headers] .d2l-table tr[selected] th,
	d2l-table-wrapper[type="default"][sticky-headers] .d2l-table tr[selected] td {
		border-top: var(--d2l-table-border);
		border-top-color: var(--d2l-table-row-border-color-selected);
	}
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table .d2l-table-cell-first,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table > thead > tr > td:first-child,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table > tbody > tr > td:first-child,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table th:first-child {
		border-right: var(--d2l-table-border);
	}
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table [selected] .d2l-table-cell-first,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table > thead > tr[selected] > td:first-child,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table > tbody > tr[selected] > td:first-child,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table [selected] th:first-child {
		border-right-color: var(--d2l-table-row-border-color-selected);
	}
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table [selected] .d2l-table-cell-first,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table [selected] > thead > tr > td:first-child,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table [selected] > tbody > tr > td:first-child,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table [selected] + :not([selected]) .d2l-table-cell-last,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table [selected] + :not([selected]) td:last-child {
		border-left: var(--d2l-table-border);
	}
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table [header] + [header] > td,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table [header] + [header] > th,
	[dir="rtl"] d2l-table-wrapper[type="default"][sticky-headers] .d2l-table thead tr:not(:first-child) th {
		border-right: none;
	}
	d2l-table-wrapper[type="default"][sticky-headers] .d2l-table > tbody > tr.d2l-table-row-last > td,
	d2l-table-wrapper[type="default"][sticky-headers] .d2l-table > tbody > tr.d2l-table-row-last > th {
		border-bottom: var(--d2l-table-border)
	}
	d2l-table-wrapper[type="default"][sticky-headers] .d2l-table tr[selected].d2l-table-row-last td,
	d2l-table-wrapper[type="default"][sticky-headers] .d2l-table tr[selected].d2l-table-row-last th  {
		border-bottom-color: var(--d2l-table-row-border-color-selected);
	}
	d2l-table-wrapper[type="default"][sticky-headers] .d2l-table > tbody > tr.d2l-table-row-first.d2l-table-row-last > td.d2l-table-cell-first.d2l-table-cell-last {
		border-top: var(--d2l-table-border);
		border-bottom: var(--d2l-table-border);
	}
`;
