
describe('Status Change APIs', function () {
const awbForPreProd="14228553968256"
const timestampForNDRonPreProd="2024-01-22T08:40:14Z"
const awbForStage="DUMG8JC2INUJ"
const timeStampForNDRonStage="2024-01-20T22:00:00.000Z"

    //api to mark an order as delivered on stage 
    it('deliveredAPI ', function () {

        const payload = {
            data: {
                awb: awbForStage,
                scans: "",
                current_status: "delivered",
                latest_status: {
                    clickpost_status_code: 8,
                    timestamp: "2023-04-16T22:00:00.000Z"
                },
                clickpost_data: {
                    clickpost_status_code: 8
                },
                additional: {
                    ndr_status_code: "1",
                    ndr_status_description: "Customer Unavailable"
                }
            }
        }
        cy.request({
            method: 'POST',
            url: 'http://nushop-dashboard.kaip.in/api/update-order-state',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Server': 'nginx',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"'
               
            },
            body: payload
        }).then((response) => {        
            expect(response.status).to.equal(200); 
            cy.log(JSON.stringify(response.body));
        });
    })

    //api to mark an order as dispatched on stage 
    it('IntransitAPI',function(){
        const payloadtwo={
            Shipment: {
                Status: {
                    Status: "in transit",
                    StatusDateTime: "2023-11-22T18:58:42.767",
                    StatusType: "UD",
                    StatusLocation: "Gujarat",
                    Instructions: "Shipped"
                },
                PickUpDate: "",
                NSLCode: "XYZ",
                Sortcode: "IXC",
                ReferenceNo: "NCR1700646462703-2V",
                AWB: awbForStage
            }
         }
         cy.request({
            method: 'POST',
            url: 'https://qp47t26sl7.execute-api.ap-south-1.amazonaws.com/uat/v1/nushop/delhivery-stage',
            headers: {
                'Content-Type': 'application/json',
                'Server': 'nginx',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"'
               
            },
            body:payloadtwo
        }).then((response)=>{
           // expect(response.status).to.equal(200); 
            cy.log(JSON.stringify(response.body));
        })

    })

    //api to mark an order as out for delivery on stage 
    it('OFD',function(){
const payloadThree={
    Shipment: {
        Status: {
            Status: "dispatched",
            StatusDateTime: "2023-12-11T19:01:42.767",
            StatusType: "UD",
            StatusLocation: "Gujarat",
            Instructions: "Out For Delivery"
        },
        PickUpDate: "",
        NSLCode: "X-DDD3FD",
        Sortcode: "IXC",
        ReferenceNo: "NS0FO1702283563015",
        AWB: awbForStage
    }
 }
 cy.request({
    method: 'POST',
    url: 'https://qp47t26sl7.execute-api.ap-south-1.amazonaws.com/uat/v1/nushop/delhivery-stage',
    headers: {
        'Content-Type': 'application/json',
        'Server': 'nginx',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"'
       
    },
    body:payloadThree
}).then((response)=>{
    // expect(response.status).to.equal(200); 
     cy.log(JSON.stringify(response.body));
 })


    })

    //api to mark an order as Failed Delivery on stage 
    it('FailedDelivery',function(){
        const payloadFour={
            Shipment: {
                Status: {
                    Status: "pending",
                    StatusDateTime: "2023-11-22T19:01:42.767",
                    StatusType: "UD",
                    StatusLocation: "Gujarat",
                    Instructions: "Failed Delivery"
                },
                PickUpDate: "",
                NSLCode: "EOD-11",
                Sortcode: "IXC",
                ReferenceNo: "NCR1700646462703-2V",
                AWB: awbForStage
            }
         }
         cy.request({
            method: 'POST',
            url: 'https://qp47t26sl7.execute-api.ap-south-1.amazonaws.com/uat/v1/nushop/delhivery-stage',
            headers: {
                'Content-Type': 'application/json',
                'Server': 'nginx',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"'    
            },
            body:payloadFour
        }).then((response)=>{
            // expect(response.status).to.equal(200); 
             cy.log(JSON.stringify(response.body));
         })


    })

    //api to mark an order as RTO initiated on stage 
    it('rtoInitiated',function(){
        const payloadfive={
            Shipment: {
                Status: {
                    Status: "dispatched",
                    StatusDateTime: "2023-11-22T19:01:42.767",
                    StatusType: "RT",
                    StatusLocation: "Gujarat",
                    Instructions: "RTO Initiated"
                },
                PickUpDate: "",
                NSLCode: "EOD-11",
                Sortcode: "IXC",
                ReferenceNo: "NCR1700646462703-2V",
                AWB: awbForStage
            }
         }
         cy.request({
            method :"POST",
            url:"https://qp47t26sl7.execute-api.ap-south-1.amazonaws.com/uat/v1/nushop/delhivery-stage",
            headers :{
                'Content-Type': 'application/json',
                'Server': 'nginx',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"' 
            },
            body :payloadfive      
         }).then((response)=>{
            cy.log(JSON.stringify(response.body));
         })
    })

    //api to mark an order as RTO Delivered on stage
    it('rtoDelivered',function(){
        const paylodSix={
            Shipment: {
                Status: {
                    Status: "rto",
                    StatusDateTime: "2023-11-22T19:08:42.767",
                    StatusType: "DL",
                    StatusLocation: "Gujarat",
                    Instructions: "RTO Delivered"
                },
                PickUpDate: "",
                NSLCode: "EOD-11",
                Sortcode: "IXC",
                ReferenceNo: "NCR1700646462703-2V",
                AWB: awbForStage
            }
         }
         cy.request({
            method :"POST",
            url:"https://qp47t26sl7.execute-api.ap-south-1.amazonaws.com/uat/v1/nushop/delhivery-stage",
            headers :{
                'Content-Type': 'application/json',
                'Server': 'nginx',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"' 
            },
            body :paylodSix      
         }).then((response)=>{
            cy.log(JSON.stringify(response.body));
         })
    })

    //api to mark an order as NDR  stage 

    it('ndrForStage',function(){
const payloadForNDR={
    "data": {
        "awb": "DUMG8JC2INUJ",
        "scans": "",
        "current_status": "pending",
        "latest_status": {
            "clickpost_status_code":9,
            "timestamp": timeStampForNDRonStage
        },
        "clickpost_data": {
            "clickpost_status_code": 9
        },
        "additional": {
            "ndr_status_code": "1",
            "ndr_status_description": "Customer Unavailable"
        }
     }
}
cy.request({
    method :"POST",
    url:"http://nushop-dashboard.kaip.in/api/update-order-state",
    headers :{
        'Content-Type': 'application/json; charset=utf-8',
        'Server': 'nginx',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"' 
    },
    body :payloadForNDR      
 }).then((response)=>{
    cy.log(JSON.stringify(response.body));
 })

    })
    ///////////////////////////////////////////////////////////////

    //status change APIs for Pre-Prod

    //API to mark an AWB dispatched on pre prod 
    it('DispatchedForPreProd ', function () {
        const dispatchedForPreProd = {
            awb: awbForPreProd,
            additional: {
              courier_partner_edd: null,
              destination_hub_inscan_ts: null,
              order_id: "NSU1702473851909",
              latest_status: {
                status: "In Transit",
                clickpost_status_description: "PickedUp",
                clickpost_status_bucket: 2,
                reference_number: "NSU1702473851909",
                clickpost_status_bucket_description: "Shipped",
                remark: "Shipment picked up",
                timestamp: "2023-04-20T14: 55: 13Z",
                location: "Rajkot_Amargadh_H (Gujarat)",
                clickpost_city: "",
                clickpost_status_code: 4
              },
              is_rvp: false,
              ndr_status_code: null,
              ndr_status_description: null,
              account_code: "DELHIVERY SURFACE",
              npr_status_code: null,
              npr_status_description: null
            },
            clickpost_data: {
              location: "Rajkot_Amargadh_H (Gujarat)",
              additional: {
                courier_partner_edd: null,
                destination_hub_inscan_ts: null,
                order_id: "NSU1702473851909",
                latest_status: {
                  status: "In Transit",
                  clickpost_status_description: "PickedUp",
                  clickpost_status_bucket: 2,
                  reference_number: "NSU1702473851909",
                  clickpost_status_bucket_description: "Shipped",
                  remark: "Shipment picked up",
                  timestamp: "2023-04-20T14: 55: 13Z",
                  location: "Rajkot_Amargadh_H (Gujarat)",
                  clickpost_city: "",
                  clickpost_status_code: 4
                },
                is_rvp: false,
                ndr_status_code: null,
                ndr_status_description: null,
                account_code: "DELHIVERY SURFACE",
                npr_status_code: null,
                npr_status_description: null
              },
              status: "In Transit",
              clickpost_city: "",
              clickpost_status_code: 4,
              clickpost_status_description: "PickedUp",
              cp_id: 4,
              remark: "Shipment picked up",
              account_code: "DELHIVERY SURFACE",
              waybill: awbForPreProd,
              timestamp: "2023-04-20T14: 55: 13Z"
            },
            latest_status: {
              status: "In Transit",
              clickpost_status_description: "PickedUp",
              clickpost_status_bucket: 2,
              reference_number: "NSU1702473851909",
              clickpost_status_bucket_description: "Shipped",
              remark: "Shipment picked up",
              timestamp: "2023-04-20T14: 55: 13Z",
              location: "Rajkot_Amargadh_H (Gujarat)",
              clickpost_city: "",
              clickpost_status_code: 4
            },
            current_status: "dispatched"
          }
        cy.request({
            method: 'PUT',
            url: `https://dashboard.preprod.blitzshopdeck.in/api/status-change/${awbForPreProd}/dispatched`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Server': 'nginx',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"'
               
            },
            body: dispatchedForPreProd
        }).then((response) => {        
            expect(response.status).to.equal(200); 
            cy.log(JSON.stringify(response.body));
        });
    })

    //API to mark an AWB delivered on pre prod 
    it('DeliveredForPreProd ', function () {
        const deliveredForPreProd = {
            awb: awbForPreProd,
            additional: {
              courier_partner_edd: "2023-04-24",
              destination_hub_inscan_ts: null,
              order_id: "NSU1702473851909",
              latest_status: {
                status: "Delivered",
                clickpost_status_description: "Delivered",
                clickpost_status_bucket: 6,
                reference_number: "NSU1702473851909",
                clickpost_status_bucket_description: "Delivered",
                remark: "Delivered to consignee",
                timestamp: "2023-12-14T09:30:18Z",
                location: "Hyd_North (Telangana)",
                clickpost_city: "HYDERABAD",
                clickpost_status_code: 8
              },
              is_rvp: false,
              ndr_status_code: null,
              ndr_status_description: null,
              account_code: "DELHIVERY SURFACE",
              npr_status_code: null,
              npr_status_description: null
            },
            clickpost_data: {
              location: "Hyd_North (Telangana)",
              additional: {
                courier_partner_edd: "2023-04-24",
                destination_hub_inscan_ts: null,
                order_id: "NSU1702473851909",
                latest_status: {
                  status: "Delivered",
                  clickpost_status_description: "Delivered",
                  clickpost_status_bucket: 6,
                  reference_number: "NSU1702473851909",
                  clickpost_status_bucket_description: "Delivered",
                  remark: "Delivered to consignee",
                  timestamp: "2023-04-21T09:30:18Z",
                  location: "Hyd_North (Telangana)",
                  clickpost_city: "HYDERABAD",
                  clickpost_status_code: 8
                },
                is_rvp: false,
                ndr_status_code: null,
                ndr_status_description: null,
                account_code: "DELHIVERY SURFACE",
                npr_status_code: null,
                npr_status_description: null
              },
              status: "Delivered",
              clickpost_city: "HYDERABAD",
              clickpost_status_code: 8,
              clickpost_status_description: "Delivered",
              cp_id: 4,
              remark: "Delivered to consignee",
              account_code: "DELHIVERY SURFACE",
              waybill: awbForPreProd,
              timestamp: "2023-12-14T09:30:18Z"
            },
            latest_status: {
              status: "Delivered",
              clickpost_status_description: "Delivered",
              clickpost_status_bucket: 6,
              reference_number: "NSU1702473851909",
              clickpost_status_bucket_description: "Delivered",
              remark: "Delivered to consignee",
              timestamp: "2023-12-14T09:30:18Z",
              location: "Hyd_North (Telangana)",
              clickpost_city: "HYDERABAD",
              clickpost_status_code: 8
            },
            current_status: "delivered"
          }
        cy.request({
            method: 'PUT',
            url: `https://dashboard.preprod.blitzshopdeck.in/api/status-change/${awbForPreProd}/delivered`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Server': 'nginx',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"'             
            },
            body: deliveredForPreProd
        }).then((response) => {        
            expect(response.status).to.equal(200); 
            cy.log(JSON.stringify(response.body));
        });
    })

    //API to mark an AWB OutForDelivery on Pre Prod
    it('OutForDeliveryForPreProd',function(){
        const outForDeliveryForPreProd={
            awb: awbForPreProd,
            additional: {
              courier_partner_edd: "2023-04-21",
              destination_hub_inscan_ts: null,
              order_id: "NS0J21681740727802-RL",
              latest_status: {
                status: "Dispatched",
                clickpost_status_description: "OutForDelivery",
                clickpost_status_bucket: 4,
                reference_number: "NS0J21681740727802-RL",
                clickpost_status_bucket_description: "Out for delivery",
                remark: "Out for delivery",
                timestamp: "2023-04-21T08:03:59Z",
                location: "Delhi_Sangamvihar_D (Delhi)",
                clickpost_city: "",
                clickpost_status_code: 6
              },
              is_rvp: false,
              ndr_status_code: null,
              ndr_status_description: null,
              account_code: "DELHIVERY SURFACE",
              npr_status_code: null,
              npr_status_description: null
            },
            clickpost_data: {
              location: "Delhi_Sangamvihar_D (Delhi)",
              additional: {
                courier_partner_edd: "2023-04-21",
                destination_hub_inscan_ts: null,
                order_id: "NS0J21681740727802-RL",
                latest_status: {
                  status: "Dispatched",
                  clickpost_status_description: "OutForDelivery",
                  clickpost_status_bucket: 4,
                  reference_number: "NS0J21681740727802-RL",
                  clickpost_status_bucket_description: "Out for delivery",
                  remark: "Out for delivery",
                  timestamp: "2023-04-21T08:03:59Z",
                  location: "Delhi_Sangamvihar_D (Delhi)",
                  clickpost_city: "",
                  clickpost_status_code: 6
                },
                is_rvp: false,
                ndr_status_code: null,
                ndr_status_description: null,
                account_code: "DELHIVERY SURFACE",
                npr_status_code: null,
                npr_status_description: null
              },
              status: "Dispatched",
              clickpost_city: "",
              clickpost_status_code: 6,
              clickpost_status_description: "OutForDelivery",
              cp_id: 4,
              remark: "Out for delivery",
              account_code: "DELHIVERY SURFACE",
              waybill: awbForPreProd,
              timestamp: "2023-04-21T08:03:59Z"
            },
            latest_status: {
              status: "Dispatched",
              clickpost_status_description: "OutForDelivery",
              clickpost_status_bucket: 4,
              reference_number: "NS0J21681740727802-RL",
              clickpost_status_bucket_description: "Out for delivery",
              remark: "Out for delivery",
              timestamp: "2023-04-21T08:03:59Z",
              location: "Delhi_Sangamvihar_D (Delhi)",
              clickpost_city: "",
              clickpost_status_code: 6
            },
            current_status: "out_for_delivery"
          }
          cy.request({
            method: 'PUT',
            url: `https://dashboard.preprod.blitzshopdeck.in/api/status-change/${awbForPreProd}/out-for-delivery`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Server': 'nginx',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"'             
            },
            body: outForDeliveryForPreProd
        }).then((response) => {        
            expect(response.status).to.equal(200); 
            cy.log(JSON.stringify(response.body));
        });
    })

    //API to mark an Order as RTO Initiated on pre Prod 
    it('rtoInitiated',function(){
        const rtoInitiatedForPreProd={
            awb:awbForPreProd,
            additional: {
              courier_partner_edd: "2023-04-19",
              destination_hub_inscan_ts: null,
              order_id: "NS0481681510580571-0V",
              latest_status: {
                status: "In Transit",
                clickpost_status_description: "RTO-InTransit",
                clickpost_status_bucket: 7,
                reference_number: "NS0481681510580571-0V",
                clickpost_status_bucket_description: "Returned",
                remark: "Bag Added To Trip",
                timestamp: "2023-04-21T10:13:57Z",
                location: "Pune_Sudhwadi_GW (Maharashtra)",
                clickpost_city: "",
                clickpost_status_code: 21
              },
              is_rvp: false,
              ndr_status_code: null,
              ndr_status_description: null,
              account_code: "DELHIVERY SURFACE",
              npr_status_code: null,
              npr_status_description: null
            },
            clickpost_data: {
              location: "Pune_Sudhwadi_GW (Maharashtra)",
              additional: {
                courier_partner_edd: "2023-04-19",
                destination_hub_inscan_ts: null,
                order_id: "NS0481681510580571-0V",
                latest_status: {
                  status: "In Transit",
                  clickpost_status_description: "RTO-InTransit",
                  clickpost_status_bucket: 7,
                  reference_number: "NS0481681510580571-0V",
                  clickpost_status_bucket_description: "Returned",
                  remark: "Bag Added To Trip",
                  timestamp: "2023-04-21T10:13:57Z",
                  location: "Pune_Sudhwadi_GW (Maharashtra)",
                  clickpost_city: "",
                  clickpost_status_code: 21
                },
                is_rvp: false,
                ndr_status_code: null,
                ndr_status_description: null,
                account_code: "DELHIVERY SURFACE",
                npr_status_code: null,
                npr_status_description: null
              },
              status: "In Transit",
              clickpost_city: "",
              clickpost_status_code: 21,
              clickpost_status_description: "RTO-InTransit",
              cp_id: 4,
              remark: "Bag Added To Trip",
              account_code: "DELHIVERY SURFACE",
              waybill: awbForPreProd,
              timestamp: "2023-04-21T10:13:57Z"
            },
            latest_status: {
              status: "In Transit",
              clickpost_status_description: "RTO-InTransit",
              clickpost_status_bucket: 7,
              reference_number: "NS0481681510580571-0V",
              clickpost_status_bucket_description: "Returned",
              remark: "Bag Added To Trip",
              timestamp: "2023-04-21T10:13:57Z",
              location: "Pune_Sudhwadi_GW (Maharashtra)",
              clickpost_city: "",
              clickpost_status_code: 21
            },
            current_status: "rto_initiated"
          }
          cy.request({
            method: 'PUT',
            url: `https://dashboard.preprod.blitzshopdeck.in/api/status-change/${awbForPreProd}/rto-initiated`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Server': 'nginx',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"'             
            },
            body: rtoInitiatedForPreProd
        }).then((response) => {        
            expect(response.status).to.equal(200); 
            cy.log(JSON.stringify(response.body));
        });

    })

    //API to mark an order as RTO Delivered on pre Prod 
    it('rtoDelivered',function(){
        const rtoDeliveredForPreProd={
            "awb": awbForPreProd,
            "additional": {
              "courier_partner_edd": "2023-04-10",
              "destination_hub_inscan_ts": null,
              "order_id": "NS04S1680776452630-XY",
              "latest_status": {
                "status": "shipment_rto_completed",
                "clickpost_status_description": "RTO-Delivered",
                "clickpost_status_bucket": 7,
                "reference_number": "NS04S1680776452630-XY",
                "clickpost_status_bucket_description": "Returned",
                "remark": "shipment_rto_completed",
                "timestamp": "2023-04-21T15:34:09Z",
                "location": "FKL_JKS",
                "clickpost_city": "",
                "clickpost_status_code": 14
              },
              "is_rvp": false,
              "ndr_status_code": null,
              "ndr_status_description": null,
              "account_code": "EKART SURFACE",
              "npr_status_code": null,
              "npr_status_description": null
            },
            "clickpost_data": {
              "location": "FKL_JKS",
              "additional": {
                "courier_partner_edd": "2023-04-10",
                "destination_hub_inscan_ts": null,
                "order_id": "NS04S1680776452630-XY",
                "latest_status": {
                  "status": "shipment_rto_completed",
                  "clickpost_status_description": "RTO-Delivered",
                  "clickpost_status_bucket": 7,
                  "reference_number": "NS04S1680776452630-XY",
                  "clickpost_status_bucket_description": "Returned",
                  "remark": "shipment_rto_completed",
                  "timestamp": "2023-04-21T15:34:09Z",
                  "location": "FKL_JKS",
                  "clickpost_city": "",
                  "clickpost_status_code": 14
                },
                "is_rvp": false,
                "ndr_status_code": null,
                "ndr_status_description": null,
                "account_code": "EKART SURFACE",
                "npr_status_code": null,
                "npr_status_description": null
              },
              "status": "shipment_rto_completed",
              "clickpost_city": "",
              "clickpost_status_code": 14,
              "clickpost_status_description": "RTO-Delivered",
              "cp_id": 55,
              "remark": "shipment_rto_completed",
              "account_code": "EKART SURFACE",
              "waybill":awbForPreProd,
              "timestamp": "2023-04-21T15:34:09Z"
            },
            "latest_status": {
              "status": "shipment_rto_completed",
              "clickpost_status_description": "RTO-Delivered",
              "clickpost_status_bucket": 7,
              "reference_number": "NS04S1680776452630-XY",
              "clickpost_status_bucket_description": "Returned",
              "remark": "shipment_rto_completed",
              "timestamp": "2023-04-21T15:34:09Z",
              "location": "FKL_JKS",
              "clickpost_city": "",
              "clickpost_status_code": 14
            },
            "current_status": "rto_delivered"
          }
          cy.request({
            method: 'PUT',
            url: `https://dashboard.preprod.blitzshopdeck.in/api/status-change/${awbForPreProd}/rto-delivered`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Server': 'nginx',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"'             
            },
            body: rtoDeliveredForPreProd
        }).then((response) => {        
            expect(response.status).to.equal(200); 
            cy.log(JSON.stringify(response.body));
        });

    })

    //API to mark an order as NDR on pre Prod 
    it('ndrForPreProd',function(){
        const ndrForPreProd={
            awb: awbForPreProd,
            additional: {
              courier_partner_edd: "2024-01-21",
              destination_hub_inscan_ts: null,
              order_id: "NSK1702473847190",
              latest_status: {
                status: "Pending",
                clickpost_status_description: "FailedDelivery",
                clickpost_status_bucket: 5,
                reference_number: "NSK1702473847190",
                clickpost_status_bucket_description: "Failed delivery",
                remark: "Customer asked for open delivery",
                timestamp: "2024-01-21T08:40:14Z",
                location: "Kothakota_Vidyanagar_DPP (Telangana)",
                clickpost_city: "",
                clickpost_status_code: 9
              },
              is_rvp: false,
              ndr_status_code: 12,
              ndr_status_description: "Customer wants open delivery",
              account_code: "DELHIVERY SURFACE",
              npr_status_code: null,
              npr_status_description: null
            },
            clickpost_data: {
              location: "Kothakota_Vidyanagar_DPP (Telangana)",
              additional: {
                courier_partner_edd: "2024-01-20",
                destination_hub_inscan_ts: null,
                order_id: "NSK1702473847190",
                latest_status: {
                  status: "Pending",
                  clickpost_status_description: "FailedDelivery",
                  clickpost_status_bucket: 5,
                  reference_number: "NSK1702473847190",
                  clickpost_status_bucket_description: "Failed delivery",
                  remark: "Customer asked for open delivery",
                  timestamp: "2024-01-20T08:40:14Z",
                  location: "Kothakota_Vidyanagar_DPP (Telangana)",
                  clickpost_city: "",
                  clickpost_status_code: 9
                },
                is_rvp: false,
                ndr_status_code: 12,
                ndr_status_description: "Customer wants open delivery",
                account_code: "DELHIVERY SURFACE",
                npr_status_code: null,
                npr_status_description: null
              },
              status: "Pending",
              clickpost_city: "",
              clickpost_status_code: 9,
              clickpost_status_description: "FailedDelivery",
              cp_id: 4,
              remark: "Customer asked for open delivery",
              account_code: "DELHIVERY SURFACE",
              waybill: awbForPreProd,
              timestamp: "2024-01-20T08:40:14Z"
            },
            latest_status: {
              status: "Pending",
              clickpost_status_description: "FailedDelivery",
              clickpost_status_bucket: 5,
              reference_number: "NSK1702473847190",
              clickpost_status_bucket_description: "Failed delivery",
              remark: "Customer asked for open delivery",
              timestamp: timestampForNDRonPreProd,
              location: "Kothakota_Vidyanagar_DPP (Telangana)",
              clickpost_city: "",
              clickpost_status_code: 9
            },
            current_status: "undelivered"
          }
          cy.request({
            method: 'PUT',
            url: `https://dashboard.preprod.blitzshopdeck.in/api/status-change/${awbForPreProd}/undelivered`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Server': 'nginx',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"'             
            },
            body: ndrForPreProd
        }).then((response) => {        
            expect(response.status).to.equal(200); 
            cy.log(JSON.stringify(response.body));
        });
    })

})