/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const outputs = [];

    const body = context.bindingData.input.text.split(" ");

    const threePartIndex = body.length / 3;

    const thirdPart = body.splice(-threePartIndex);
    const secondPart = body.splice(-threePartIndex);
    const firstPart = body;

    outputs.push(yield context.df.callActivity("worker1", firstPart));
    outputs.push(yield context.df.callActivity("worker2", secondPart));
    outputs.push(yield context.df.callActivity("worker3", thirdPart));
    return outputs.flat().reduce((result, n)=>{
        return result + n ;
    });
});