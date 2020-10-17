const request = require("supertest");
const express = require("express");
const metricRoutes = require("./metric");
var MetricLog = require( './../models/metric-log');


let twoHoursAgo = new Date();
twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

global.metricLogs = new Map();
metricLogs.set('key1', [
    new MetricLog( new Date(), 20),
    new MetricLog( new Date(), 30),
    new MetricLog( twoHoursAgo, 10),
    
]);

  
const app = express();
app.use("/metric", metricRoutes);

describe("Metric-Routes",()=>{

    it("GET /metric/:key/sum returns 404 when key is not found",async ()=>{
        const {statusCode} = await request(app).get("/metric/key5/sum");
        expect(statusCode).toEqual(404);

    });

    it("GET /metric/:key/sum returns http 200 when key is found",async ()=>{
        
        const {statusCode} = await request(app).get("/metric/key1/sum");
        expect(statusCode).toEqual(200);
    });

    it("GET /metric/:key/sum returns correct sum for only values in last hour",async ()=>{
        
        const { body, statusCode } = await request(app).get("/metric/key1/sum");
        expect(statusCode).toEqual(200);
        expect(body).toEqual({ value: 50 });
    });
});