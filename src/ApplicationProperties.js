export const ApplicationProperties = {
	ETHERSCAN_API_KEY: 'SAHN16FACXJYN1CQI1GXC5HBXFZY8MF4TS',
	ETHERSCAN_API_URL: 'https://etherscan.io/',
	ACTIVE_NETWORK: {
		name: 'homestead',
		chainId: 1,
		ensAddress: '',
		apiUrl: 'https://api.etherscan.io/',
		txUrl: 'https://etherscan.io/tx/',
		displayName: 'Ethereum Mainnet',
		readonly: true,
		symbol: 'ETH',
	},
	NETWORKS: [{
		name: 'homestead',
		chainId: 1,
		ensAddress: '',
		apiUrl: 'https://api.etherscan.io/',
		txUrl: 'https://etherscan.io/tx/',
		displayName: 'Ethereum Mainnet',
		readonly: true,
		symbol: 'ETH'
	}, {
		name: 'rinkeby',
		chainId: 4,
		ensAddress: '',
		apiUrl: 'https://api-rinkeby.etherscan.io/',
		txUrl: 'https://rinkeby.etherscan.io/tx/',
		displayName: 'Rinkeby Test Network',
		readonly: true,
		symbol: 'ETH'
	}, {
		name: 'kovan',
		chainId: 42,
		ensAddress: '',
		apiUrl: 'https://api-kovan.etherscan.io/',
		txUrl: 'https://kovan.etherscan.io/tx/',
		displayName: 'Kovan Test Network',
		readonly: true,
		symbol: 'ETH'
	}, {
		name: 'ropsten',
		chainId: 3,
		ensAddress: '',
		apiUrl: 'https://api-ropsten.etherscan.io/',
		txUrl: 'https://ropsten.etherscan.io/tx/',
		displayName: 'Rosten Test Network',
		readonly: true,
		symbol: 'ETH'
	}, {
		name: 'goerli',
		chainId: 5,
		ensAddress: '',
		apiUrl: 'https://api-goerli.etherscan.io/',
		txUrl: 'https://goerli.etherscan.io/tx/',
		displayName: 'Goerli Testnet',
		readonly: true,
		symbol: 'ETH'
	}],
	API_PROVIDERS: {
		etherscan: this.ETHERSCAN_API_KEY,
		infura: {
			projectId: '282501a191624696ae503c0534e8f646',
			projectSecret: 'aab3efe83fe44e53a30e7cd1afc3fdf0',
		},
		alchemy: 'dDowuL9P6nWr22cur5nv6ww_Oj23Jteu'
	},
	DEFAULT_CURRENCY: { key: 'USD', value: 0 },
	DEFAULT_LANGUAGE: {
		code: 'en',
		icon: 'EN',
		name: 'English'
	},
	LANGUAGE_LIST: [{
		code: 'sp',
		icon: 'SP',
		name: 'Spanish'
	},
	{
		code: 'en',
		icon: 'GB',
		name: 'English'
	}
	],
	TIME_FORMAT: 'h:mm:ss a, MMMM Do YYYY',
	TOKEN_URLS: {
		compound: 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json',
		coingecko: 'https://tokens.coingecko.com/uniswap/all.json',
		optimism: 'https://static.optimism.io/optimism.tokenlist.json',
		aave: 'https://tokenlist.aave.eth.link/',
		kleros: 'https://t2crtokens.eth.link/',
		wrapped: 'https://wrapped.tokensoft.eth.link/',
		gemini: 'https://www.gemini.com/uniswap/manifest.json',
	},
	COMMON_TOKENS: [
		{
			"name": "Ethers",
			"chainId": 1,
			"symbol": "ETH",
			"decimals": 18,
			"address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2_ETH",
			"logoURI": "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=013"
		},
		{
			"name": "Ethers",
			"chainId": 3,
			"symbol": "ETH",
			"decimals": 18,
			"address": "0xc778417E063141139Fce010982780140Aa0cD5Ab_ETH",
			"logoURI": "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=013"
		},
		{
			"name": "Ethers",
			"chainId": 42,
			"symbol": "ETH",
			"decimals": 18,
			"address": "0xd0A1E359811322d97991E03f863a0C30C2cF029C_ETH",
			"logoURI": "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=013"
		},
		{
			"name": "Ethers",
			"chainId": 5,
			"symbol": "ETH",
			"decimals": 18,
			"address": "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6_ETH",
			"logoURI": "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=013"
		},
		{
			"name": "Ethers",
			"chainId": 4,
			"symbol": "ETH",
			"decimals": 18,
			"address": "0xc778417E063141139Fce010982780140Aa0cD5Ab_ETH",
			"logoURI": "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=013"
		},
	]
};
