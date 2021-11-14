import { ethers } from 'ethers';

function commify(value) {
	return ethers.utils.commify(value);
}
function formatUnits(value, unit) {
	return ethers.utils.formatUnits(value, unit);
}
function formatEther(value) {
	return ethers.utils.formatEther(value);
}
function parseUnits(value, unit) {
	return ethers.utils.parseUnits(value, unit);
}
function parseEther(value) {
	return ethers.utils.parseEther(value);
}

const EtherUtilModule = {
	commify,
	formatUnits,
	formatEther,
	parseUnits,
	parseEther

}
export default EtherUtilModule;
