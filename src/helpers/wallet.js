import ethers from 'ethers';
import { dispatch } from '../redux/store';
import { accountUpdateAddress } from '../redux/_account';
import { keychainSave, keychainLoad } from './keychain';

export function generateSeedPhrase() {
  return ethers.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
}

export async function walletInit(seedPhrase = generateSeedPhrase()) {
  let wallet = await loadWallet();
  if (!wallet) {
    wallet = await createWallet();
  }
  dispatch(accountUpdateAddress(wallet.address));
}

export async function createWallet(seedPhrase = generateSeedPhrase()) {
  const wallet = ethers.Wallet.fromMnemonic(seedPhrase);
  wallet.provider = ethers.providers.getDefaultProvider();

  saveSeedPhrase(seedPhrase);
  savePrivateKey(wallet.privateKey);
  saveAddress(wallet.address);

  console.log(`Wallet: Generated wallet with public address: ${wallet.address}`);

  return wallet;
}

export async function loadWallet() {
  const privateKey = await loadPrivateKey();
  if (privateKey) {
    const wallet = new ethers.Wallet(privateKey);
    wallet.provider = ethers.providers.getDefaultProvider();
    console.log(`Wallet: successfully loaded existing wallet with public address: ${wallet.address}`);
    return wallet;
  }
  console.log("Wallet: failed to load existing wallet because the private key doesn't exist");
  return null;
}

export async function sendTransaction(transaction) {
  const wallet = await loadWallet();
  const transactionHash = await wallet.sendTransaction(transaction);
  return transactionHash;
}

export async function signMessage(message) {
  const wallet = await loadWallet();
  const result = await wallet.signMessage(message);
  return result;
}

/* ------------- Keychain ----------------------------------------------------------*/

const seedPhraseKey = 'seedPhrase';
const privateKeyKey = 'privateKey';
const addressKey = 'addressKey';

export async function saveSeedPhrase(seedPhrase) {
  await keychainSave(seedPhraseKey, seedPhrase);
}

export async function loadSeedPhrase() {
  const seedPhrase = await keychainLoad(seedPhraseKey);
  return seedPhrase;
}

export async function savePrivateKey(privateKey) {
  await keychainSave(privateKeyKey, privateKey);
}

export async function loadPrivateKey() {
  const privateKey = await keychainLoad(privateKeyKey);
  return privateKey;
}

export async function saveAddress(address) {
  await keychainSave(addressKey, address);
}

export async function loadAddress() {
  const privateKey = await keychainLoad(addressKey);
  return privateKey;
}
