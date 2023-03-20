const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");

const PORT = 3004;

const signingKey = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC022+2InDUHWr7
8K/p+Ce1PaGjJjY0fn57WXyaHw6OpGY8WxQMizATva5W1PZ4BFoBPoH80F91CpBq
xZXG7J2CecgoGUmj0+teYzy729KERspddtZHqg0tdYXFBtzrmye0Kuzi3EGtzPe+
6jlgwmyC2h8a4GMzvXO3dy7g5/GNtTCRTZ1sLrF3vQno1zRsu/dDtz/1OIfqU+b8
uitLVX5AJtD1GEAMMnXsg2RlVmJ9fE2xHsJ1HmlAk/qz5ebwRDfe9J8DVQO+aNWO
Z4Os2pv+tjmv3FhnKqYzMqCF8XOF2jPEwCSlTJ0/h26D73ZvMeYWLEV75+1nUlVt
9aw5DwGZAgMBAAECggEACp/Sa+1m2eXBgrvZ+wFfhHOH/Yom3dtpdDcRTV982YR5
rLAqrm2gcnnD1lOBMr3fXgUtRIFRfjy+N5t+/TYqBD/BskNWsrJQuGqAJ0arqFFy
nV4itTKIPs78KlMeeBO/rRiRcmaUetCDOZqk/2oPJE+1IJJ6brrBeQ9eDbW/wv5+
1Ohih7MMO/e1GfYzYNm/pE0se5zo+ZAAVBDWNOLXmkozV6nrOkR5xSZaxE4mPMou
JquVkoX5Dlr7YAdGm/DmabVrFVRZ40Y5htdhU8YmKL9QvbZ5FbETdhB5MPN7F/Rt
oMdhjj41GLeoWTokw+pw3t1Tm932zTPovJDR8JL+dQKBgQDcp1pQE1d9iZA3jg1y
IRr7a3Xa2nglbE0R0Msvx6iBqnwpq86vBsuKd+cjDXQmVXnTO/wgmoE8CiU+DiLV
pEuiUHJk/4Tep0g78peH2HaEPi9pgrFIuJ75nJFyKI57rHmt9Yi/L88I19QgohFJ
rjDB3rVjMnSU+XWpinWyW2kKZQKBgQDR1BeoJr+GI6boSWbaUwuxKXxZ/H91KZ5V
Alz68gbBbbjGXAnHAKrY7aaNBq1DbMbGfk6Y015ZqMd4XK9hpw6yrJp0qHV7L/pX
AnKyW+5yDEnIXfBo2JwOFTOY2bLTW9gekscFEPdIG2zFV7P2TTvv7P/FZgtJR4Tp
yTsK5q3tJQKBgAs6fO8MPOyHfo5FLUv8gUoACuxLJ8gHvdhFPsG8sEeA7HaWZpsj
hmISffGbsqhsuxlTuR3TnvX2MjT5NS6YAL1OyLN5CULnUlaynqFsE4PhQjplSy4/
Lt/W5tPfWnjSqxJ+JypLfYaerQ3IEYclVRfYhHR60dHu69znzdt4qVy9AoGACXh3
MOG+10EYsXdOqyAAcRicQjuBTTp5qQCYTcNKxsQ7CMjysAa5r1zanZbljxuDxUXC
Kmev5IAXsLkOOWwe37WmqwlHdC3wMKktoBtCIeeoFOEYjsLoGEKgt49r4NpOYOLj
FLl1T83dFPMmbkGCKQwbZz951u7hcuPgRFexFfkCgYBqsn48P+GF+RrMmD/vNPbp
+CSF32M/GWtKvQQO8ihkei0hzFUuLjbmv1gD4TZBWaWXlUaR14cnZ79Dh357xsxT
3Q2NBVPr6BFguTdWOhVDBm1zuk/EZJ333hTkf2/1UW/OnWR6tzM22/4JtrjoXXRl
niEUkcHTyPLS9QIqEfXQmA==
-----END PRIVATE KEY-----`;

const app = express();
app.use(bodyParser.json({
  extended: true,
}));

app.use(cors());

let items = [];

app.get("/api", (req, res) => {
  res.json({data: items});
});

app.get("/token", (req, res) => {
  const currentTime = Math.floor(Date.now() / 1000);
  console.log('currentTime', currentTime);
  const token = jsonwebtoken.sign(
    {
      sub: "2E52B7CB-071B-4EA2-8E9D-F64910EBDBB6", // Some unique identifier for the user
      external_id: "2E52B7CB-071B-4EA2-8E9D-F64910EBDBB6", // Generally matches sub
      name: "Vatsal Budhbhatti", // Optional
      organization: "T3JnYW5pemF0aW9uOmZmMjllMDQxLWYzMmMtNGY2Zi1hNTg3LWJkNjA3ZGJiMzViYQ==",
      customer: "react-node-app-1", // This is an external ID of a customer
      iat: currentTime,
      exp: currentTime + 60 * 60, // 1 hour from now
    },
    signingKey, // Store this somewhere safe
    {algorithm: "RS256"}
  );
  res.json({token});
});

app.post("/api", (req, res) => {
  const body = req.body;
  items.push(body.item);
  res.json({data: items});
});

app.delete("/api/clear", (req, res) => {
  items = [];
  res.json({data: items});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
