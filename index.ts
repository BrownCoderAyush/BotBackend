// import AppDataSource from "./config/db";
// import app from "./app";
// import { sanitizeFlowData } from "./src/utils/Dataformatter";
// const PORT = 3000;

// AppDataSource.initialize()
//   .then(async () => {
//     console.log("Database initialized");

//     app.listen(PORT, () => {
//       console.log(`Server running at http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Database initialization failed:", error);
//     process.exit(1);
//   });


import app from "./app";
import { sanitizeFlowData } from "./src/utils/Dataformatter";
const PORT = 3000;
const data ={
  "nodes": [
    {
      "id": "start",
      "type": "startNode",
      "position": {
        "x": 100,
        "y": 20
      },
      "data": {
        "label": "bms bot",
        "isEditing": false
      },
      "draggable": false,
      "measured": {
        "width": 120,
        "height": 88
      },
      "selected": false
    },
    {
      "id": "2",
      "type": "userMessage",
      "position": {
        "x": 234.5,
        "y": 140.25
      },
      "data": {
        "message": "Hi",
        "sender": "user",
        "isEditing": false
      },
      "measured": {
        "width": 200,
        "height": 88
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "3",
      "type": "botResponse",
      "position": {
        "x": 592,
        "y": 32.25
      },
      "data": {
        "message": "Hello how cn i help you?",
        "sender": "bot",
        "isEditing": false
      },
      "measured": {
        "width": 200,
        "height": 88
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "4",
      "type": "botResponse",
      "position": {
        "x": 544,
        "y": 383.25
      },
      "data": {
        "message": "Hi im out of office",
        "sender": "bot",
        "isEditing": false
      },
      "measured": {
        "width": 200,
        "height": 88
      },
      "selected": false
    },
    {
      "id": "5",
      "type": "userMessage",
      "position": {
        "x": 89.5,
        "y": 420.25
      },
      "data": {
        "message": "Hi is this hcp availablein this region?",
        "sender": "user",
        "isEditing": false
      },
      "measured": {
        "width": 264,
        "height": 88
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "6",
      "type": "botResponse",
      "position": {
        "x": 550,
        "y": 554.75
      },
      "data": {
        "message": "No he isnt available",
        "sender": "bot",
        "isEditing": true
      },
      "measured": {
        "width": 200,
        "height": 133
      },
      "selected": true,
      "dragging": false
    }
  ],
  "edges": [
    {
      "id": "e-start-2",
      "source": "start",
      "target": "2",
      "animated": true,
      "style": {
        "stroke": "#6366f1",
        "strokeWidth": 2
      }
    },
    {
      "animated": true,
      "style": {
        "stroke": "#6366f1",
        "strokeWidth": 2
      },
      "source": "2",
      "target": "3",
      "id": "xy-edge__2-3"
    },
    {
      "animated": true,
      "style": {
        "stroke": "#6366f1",
        "strokeWidth": 2
      },
      "source": "2",
      "target": "4",
      "id": "xy-edge__2-4"
    },
    {
      "animated": true,
      "style": {
        "stroke": "#6366f1",
        "strokeWidth": 2
      },
      "source": "start",
      "target": "5",
      "id": "xy-edge__start-5"
    },
    {
      "animated": true,
      "style": {
        "stroke": "#6366f1",
        "strokeWidth": 2
      },
      "source": "5",
      "target": "6",
      "id": "xy-edge__5-6"
    }
  ]
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} (DB init skipped)`);
   let cleaneddata= sanitizeFlowData(data.nodes, data.edges);
   console.log("Sanitized Flow Data JSON:", JSON.stringify(cleaneddata, null, 2));
});