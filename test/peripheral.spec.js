import app from "../src/app";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Peripheral from "../src/models/peripheral.model";

const onePeripheral = {
  uid: 12,
  vendor: "Vendor Pheripheral",
  status: "online",
};

const twoPeripheral = {
  uid: 13,
  vendor: "Vendor Pheripheral",
  status: "offline",
};

const threePeripheral = {
  // uid: 13,
  vendor: "Vendor Pheripheral",
  status: "offline",
};

const fourPeripheral = {
  uid: 14,
  vendor: "Vendor Pheripheral",
  status: "offline",
};

const fivePeripheral = {
  uid: 14,
  vendor: "Vendor Pheripheral",
  status: "offline",
};


const sixPeripheral = {
    uid: 15,
    vendor: "Vendor Pheripheral",
    status: "aaaa",
  };




beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

/**
 * Test the /Get peripheral ****************Should respond with a 200 status code**************************************************
 */
describe("GET /peripherals", () => {
  test("Should respond with a 200 status code", async () => {
    const response = await request(app).get("/api/peripherals").send();

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(0);
  });
});

/**
 * Test the /GET peripheral ***********************************************************************************************************
 */
describe("GET /peripheral/{id} ", () => {
  // Given the peripheral does exist
  test("GET /peripheral/{id} Given the peripheral does exist, should return a 200 status and the peripheral", async () => {
    const newPeripheral = new Peripheral(onePeripheral);
    const peripheralSaved = await newPeripheral.save();
    const peripheralId = peripheralSaved._id.toString();
    const { body, statusCode } = await request(app).get(
      `/api/peripherals/${peripheralId}`
    );

    expect(statusCode).toBe(200);
    expect(body._id).toBe(peripheralId);
    expect(body.uid).toBe(peripheralSaved.uid);
    expect(body.vendor).toBe(peripheralSaved.vendor);
    expect(body.status).toBe(peripheralSaved.status);
  });

  // Given the peripheral does not exist should return a 404
  test("GET /peripheral/{id} given the peripheral does not exists hould return a 404", async () => {
    const peripheralId = "64ed5eecca0067353732dc30";
    const response = await request(app)
      .get(`/api/peripherals/${peripheralId}`)
      .send();
    expect(response.statusCode).toBe(404);
  });
});

/**
 * Test the /POST peripheral ***********************************************************************************************************
 */

describe("POST /peripheral ", () => {
  // Insert a new gateway, should return a 201
  test("Insert a new peripheral, should return a 201", async () => {
    const response = await request(app)
      .post(`/api/peripherals`)
      .send(twoPeripheral);
    expect(response.body._id).toBeDefined();
    expect(response.statusCode).toBe(201);
  });

  describe("Validation uid", () => {
    // Check uid required
    test("Check uid required", async () => {
      const response = await request(app)
        .post(`/api/peripherals`)
        .send(threePeripheral);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Peripheral validation failed: uid: Path `uid` is required."
      );
    });

    // Check unique uid
    test("Check unique uid", async () => {
      const newPeripheral = new Peripheral(fourPeripheral);
      const peripheralSaved = await newPeripheral.save();

      const response = await request(app)
        .post(`/api/peripherals`)
        .send(fivePeripheral);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toMatch("duplicate key error collection");
      expect(response.body.message).toContain("uid");
    });
  });

  // Validate status (online/offline)
  test("Validate status (online/offline)", async () => {
    const response = await request(app)
      .post(`/api/peripherals`)
      .send(sixPeripheral);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Peripheral validation failed: status: Status must be either \"online\" or \"offline\""
      );
  });

});
