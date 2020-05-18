import web3 from './web3';

//const address = '0x8E81836E2CaCc72A3904ab6424E096A2D2CB681c';

const address = '0x9162FC3DEbdEd324D6A79CE3bA542AC420536cEa';

const abi = [{"constant":false,"inputs":[],"name":"enter_network","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"ch_st","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"uav","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"alluavs","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

export default new web3.eth.Contract(abi, address);
