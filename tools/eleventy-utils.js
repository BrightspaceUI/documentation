module.exports = {
	parseConfigurationValue: (tag, demoSnippet, requireSplitOnNewlines) => {
		let value;

		if (!demoSnippet) return undefined;

		if (requireSplitOnNewlines && !demoSnippet.includes('\n')) {
			throw new Error('Snippet info should not be divided by spaces if using "defaults" due to parsing. Use multi-line method.');
		}

		if (demoSnippet.includes(`${tag}:`)) {
			const splitsOnNewlines = demoSnippet.includes('\n');
			let section = demoSnippet.split(`${tag}:`)[1];
			section = section.split('-->')[0];

			if (splitsOnNewlines) {
				if (section.includes('\n')) value = section.split('\n')[0];
				else value = section; // last one and --> was on last line instead of below
			} else {
				value = section.split(' ')[0];
			}
		}
		return value ? value.trim() : undefined;
	}
};
