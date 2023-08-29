import app from "../src/app";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Gateway from "../src/models/gateway.model.js";
import Peripheral from "../src/models/peripheral.model";

const gatewayId = new mongoose.Types.ObjectId().toString();

describe("Gateways", () => {
  const oneGateway = {
    serialNumber: "SN123456",
    name: "GatewayPrime",
    addressIPV4: "192.168.1.1",
    peripherals: [],
  };

  const twoGateway = {
    serialNumber: "SN223456",
    name: "GatewayPrime",
    addressIPV4: "192.168.1.2",
    peripherals: [],
  };

  const threeGateway = {
    serialNumber: "SN323456",
    name: "GatewayPrime",
    addressIPV4: "192.168.1.3",
    peripherals: ["64e77c2d398bd19aa78b79f8"],
  };

  const fourGateway = {
    serialNumber: "SN423456",
    name: "GatewayPrime",
    addressIPV4: "192.168.1.4",
  };

  const fiveGateway = {
    serialNumber: "SN423456",
    name: "GatewayPrime",
    addressIPV4: "192.168.1.5",
  };

  const sixGateway = {
    serialNumber: "SN523456",
    name: "GatewayPrime",
    addressIPV4: "",
  };

  const sevenGateway = {
    serialNumber: "SN723456",
    name: "GatewayPrime",
    addressIPV4: "192.168.1.5",
  };

  const eightGateway = {
    serialNumber: "SN823456",
    name: "GatewayPrime",
    addressIPV4: "192.168.1.5",
  };

  const nineGateway = {
    name: "GatewayPrime",
    addressIPV4: "192.168.1.7",
  };

  const invalidGateways = [
    { name: "Name1", serialNumber: "SN120", addressIPV4: "256.0.0.1" },
    { name: "Name2", serialNumber: "SN122", addressIPV4: "192.168.256.1" },
    { name: "Name3", serialNumber: "SN123", addressIPV4: "10.0.0.256" },
    { name: "Name4", serialNumber: "SN121", addressIPV4: "300.100.50.2" },
    { name: "Name5", serialNumber: "SN124", addressIPV4: "192.168.1" },
    { name: "Name6", serialNumber: "SN125", addressIPV4: "192.168.1.2.3" },
    { name: "Name7", serialNumber: "SN126", addressIPV4: "192.168.1.a" },
    { name: "Name8", serialNumber: "SN127", addressIPV4: "192.168.1.1." },
    { name: "Name9", serialNumber: "SN128", addressIPV4: "-192.168.1.1" },
    { name: "Name10", serialNumber: "SN129", addressIPV4: "192.-168.1.1" },
    { name: "Name11", serialNumber: "SN1210", addressIPV4: "192.168.-1.1" },
    { name: "Name12", serialNumber: "SN1211", addressIPV4: "192.168.1.-1" },
    { name: "Name13", serialNumber: "SN1212", addressIPV4: " 192.168.1.1" },
    { name: "Name14", serialNumber: "SN1213", addressIPV4: "192.168.1.1 " },
    { name: "Name15", serialNumber: "SN1214", addressIPV4: " 192.168.1.1 " },
    { name: "Name16", serialNumber: "SN1215", addressIPV4: "192.168.1.1!" },
    { name: "Name17", serialNumber: "SN1216", addressIPV4: "192.168.1.1_" },
    { name: "Name18", serialNumber: "SN1217", addressIPV4: "192.168.1.1$" },
    { name: "Name19", serialNumber: "SN1218", addressIPV4: "192.168.1" },
    { name: "Name20", serialNumber: "SN1219", addressIPV4: "192.168" },
    { name: "Name21", serialNumber: "SN1220", addressIPV4: "192" },
    // { name: "Name22", serialNumber: "SN1221", addressIPV4: "" },
  ];

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  /**
   * Test the /Get gateways ****************Should respond with a 200 status code**************************************************
   */
  describe("GET /gateways", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app).get("/api/gateways").send();

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });

  /**
   * Test the /GET gateway ***********************************************************************************************************
   */
  describe("GET /gateway/{id} ", () => {
    // Given the gateway does exist
    test("GET /gateway/{id} Given the gateway does exist, should return a 200 status and the gateway", async () => {
      const newGateway = new Gateway(oneGateway);
      const gatewaySaved = await newGateway.save();
      const gatewayId = gatewaySaved._id.toString();
      const { body, statusCode } = await request(app).get(
        `/api/gateways/${gatewayId}`
      );

      expect(statusCode).toBe(200);
      expect(body._id).toBe(gatewayId);
      expect(body.serialNumber).toBe(gatewaySaved.serialNumber);
      expect(body.name).toBe(gatewaySaved.name);
      expect(body.addressIPV4).toBe(gatewaySaved.addressIPV4);
    });

    // Given the gateway does not exist should return a 404
    test("GET /gateway/{id} given the gateway does not exists hould return a 404", async () => {
      const gatewayId = "64ed5eecca0067353732dc30";
      const response = await request(app)
        .get(`/api/gateways/${gatewayId}`)
        .send();
      expect(response.statusCode).toBe(404);
    });
  });

  /**
   * Test the /POST gateway ***********************************************************************************************************
   */
  describe("POST /gateway ", () => {
    // Insert a new gateway, should return a 201
    test("Insert a new gateway, should return a 201", async () => {
      const response = await request(app)
        .post(`/api/gateways`)
        .send(twoGateway);
      expect(response.body._id).toBeDefined();
      expect(response.statusCode).toBe(201);
    });

    describe("Validation serialNumber", () => {
      // Check serial number required
      test("Check serial number required", async () => {
        const response = await request(app)
          .post(`/api/gateways`)
          .send(nineGateway);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
          "Gateway validation failed: serialNumber: Path `serialNumber` is required."
        );
      });

      // Check unique serial number
      test("Check unique serial number", async () => {
        const newGateway = new Gateway(fourGateway);
        const gatewaySaved = await newGateway.save();

        const response = await request(app)
          .post(`/api/gateways`)
          .send(fiveGateway);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toMatch("duplicate key error collection");
        expect(response.body.message).toContain("serialNumber");
      });
    });

    // Validation addresIPV4
    describe("Validation addressIPV4", () => {
      test("Check ip required", async () => {
        const response = await request(app)
          .post(`/api/gateways`)
          .send(sixGateway);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
          "Gateway validation failed: addressIPV4: Path `addressIPV4` is required."
        );
      });

      //Check unique ipV4
      test("Check unique ipV4", async () => {
        const newGateway = new Gateway(sevenGateway);
        const gatewaySaved = await newGateway.save();

        const response = await request(app)
          .post(`/api/gateways`)
          .send(eightGateway);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toMatch("duplicate key error collection");
        expect(response.body.message).toContain("addressIPV4");
      });

      test.each(invalidGateways)(
        "should reject invalid IP %s",
        async (gateway) => {
          const response = await request(app)
            .post("/api/gateways")
            .send(gateway);
          expect(response.status).toBe(400);
          expect(response.body.message).toBe(
            "Gateway validation failed: addressIPV4: The ip address is not valid"
          );
        }
      );
    });

    describe("Validation Peripherals", () => {
      // Check if peripherals exist before inserting into database
      test("Check if peripherals exist before inserting into database", async () => {
        const response = await request(app)
          .post(`/api/gateways`)
          .send(threeGateway);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
          "Gateway validation failed: peripherals: One or more peripherals do not exist in the database."
        );
      });

      // Prevent the gateway from receiving more than 10 peripheral devices
      test("Prevent the gateway from receiving more than 10 peripheral devices", async () => {
        let peripheralsID = [];

        for (let index = 0; index < 11; index++) {
          let peripheral = {
            uid: index + 1,
            vendor: `Vendor ${index + 1}`,
            status: "online",
          };
          const newPeripheral = new Peripheral(peripheral);
          const peripheralSaved = await newPeripheral.save();
          const peripheralId = peripheralSaved._id.toString();
          peripheralsID.push(peripheralId);
        }
        const fullGateway = {
          serialNumber: "SN923456",
          name: "GatewayPrime",
          addressIPV4: "192.168.1.115",
          peripherals: peripheralsID,
        };
        const response = await request(app)
          .post(`/api/gateways`)
          .send(fullGateway);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(
          "Gateway validation failed: peripherals: A maximum of 10 peripherals is allowed."
        );
      });
    });
  });
});
