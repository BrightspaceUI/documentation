/* stylelint-disable */
import { css } from 'lit-element';

export const customTableStyles = css`
	table.d2l-cc-custom-table {
		border: 1px solid #dfe6ef;
		border-radius: 0.3rem;
		border-spacing: 0;
		min-width: 500px;
		width: 100%;
	}

	table.d2l-cc-custom-table tr > td,
	table.d2l-cc-custom-table tr > th {
		font-weight: inherit;
		padding: 12px 6px;
		text-align: left;
		vertical-align: middle;
	}

	table.d2l-cc-custom-table thead > tr > th {
		background-color: var(--d2l-color-sylvite);
		font-weight: bold;
	}

	/* override background color or headers that live within rows */
	table.d2l-cc-custom-table tbody > tr > th {
		background-color: white;
	}

	/* padding for extra space on the left table edges */
	table.d2l-cc-custom-table tr > *:first-child {
		padding-left: 24px;
	}

	/* padding for extra space on right table edges */
	/* tr > *:last-child, */
	table.d2l-cc-custom-table tr > *:last-child {
		padding-right: 24px;
	}
	
	table.d2l-cc-custom-table th {
		border-bottom: 1px solid #dfe6ef;
	}

	/* remove borders from the last table row to prevent a double border */
	table.d2l-cc-custom-table tbody > tr:last-child > * {
		border: none;
	}

	table.d2l-cc-custom-table td {
		background-color: white;
		border-bottom: 1px solid #dfe6ef;
		line-height: 1rem;
	}

	/* round top left corner */
	table.d2l-cc-custom-table thead tr:first-child th:first-child {
		border-top-left-radius: 0.3rem;
	}
	/* round top right corner */
	table.d2l-cc-custom-table thead tr:first-child th:last-child {
		border-top-right-radius: 0.3rem;
	}
	/* round bottom right corner */
	table.d2l-cc-custom-table tbody:last-child *:last-child {
		border-bottom-right-radius: 0.3rem;
	}
	/* round bottom left corner */
	table.d2l-cc-custom-table tbody > tr:last-child > *:first-child {
		border-bottom-left-radius: 0.3rem;
	}
`;
