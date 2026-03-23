import adapter from '@sveltejs/adapter-node';

const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$sections: 'src/sections'
		}
	},
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) => ({
			runes: !filename.includes('node_modules')
		})
	}
};

export default config;
