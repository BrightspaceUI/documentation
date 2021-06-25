/* stylelint-disable */
import { css } from 'lit-element';

export const customTableStyles = css`
	table {
		border: 1px solid #dfe6ef;
		border-radius: 0.3rem;
		border-spacing: 0;
		width: 100%;
	}

	tr > td,
	tr > th {
		font-weight: inherit;
		padding: 12px 6px 12px 6px;
		text-align: left;
		vertical-align: middle;
	}

	/* table > tbody > tr:nth-child(1) > th */
	tbody:first-child > tr > th {
		background-color: var(--d2l-color-sylvite);
		font-weight: bold;
	}

	/* override background color or headers that live within rows */
	tbody > tr > th {
		background-color: white;
	}

	/* padding for extra space on the left table edges */
	tbody > tr > td:first-child,
	tbody > tr > th,
	thead > tr > th:first-child {
		padding-left: 24px;
	}

	/* padding for extra space on the table edges */
	tbody > tr > td:last-child,
	thead > tr > th:last-child {
		padding-right: 24px;
	}
	
	th {
		border-bottom: 1px solid #dfe6ef;
	}

	/* remove borders from the last table row to prevent a double border */
	tbody > tr:last-child > td,
	tbody > tr:last-child > th {
		border: none;
	}

	td {
		background-color: white;
		border-bottom: 1px solid #dfe6ef;
		line-height: 1rem;
	}

	/* round top left corner */
	thead:first-child tr:first-child th:first-child {
		border-radius: 0.3rem 0 0 0;
	}
	/* round top right corner */
	thead:first-child tr:first-child th:last-child {
		border-radius: 0 0.3rem 0 0;
	}
	/* round bottom right corner */
	tbody:last-child tr:last-child td:last-child {
		border-radius: 0 0 0.3rem 0;
	}
	/* round bottom left corner */
	tbody:last-child tr:last-child td:first-child,
	tbody:last-child tr:last-child th:first-child {
		border-radius: 0 0 0 0.3rem;
	}
`;
