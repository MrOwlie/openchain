var openchain = require('openchain');
var bitcore = require('bitcore-lib');

var seed = "896407eb6db34420bb305a7e18a69109";

var privateKey = bitcore.HDPrivateKey.fromSeed(seed, "openchain");
var address = privateKey.publicKey.toAddress();

var issuancePath = "/asset/p2pkh/" + address + "/";
var assetPath = issuancePath;
var walletPath = "/p2pkh/" + address + "/";

console.log("IssuancePath: " + issuancePath);
console.log("WalletPath: " + walletPath);

var client = new openchain.ApiClient("http://localhost:8080/");
var signer = new openchain.MutationSigner(privateKey);

client.initialize().then(function (){
  return new openchain.TransactionBuilder(client)
    .addSigningKey(signer)
    .setMetadata({"memo" : "Issued through NodeJS"})
    .updateAccountRecord(issuancePath, assetPath, -100);
})
.then(function (transactionBuilder){
  return transactionBuilder.updateAccountRecord(walletPath, assetPath, 100);
})
.then(function (transactionBuilder){
  return transactionBuilder.submit();
})
.then(function (result){
  console.log("Result: " + result);
});
