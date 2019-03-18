## **PUT Item**

Returns json data about an updated item.

- **URL**

  /items/:id

- **Method:**

  `PUT`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

`{ id: 6, group: "Build Airplane", task: "Go to Home Depot", dependencyIds: [1, 3, 4], completedAt: 'Sun Dec 17 1995 03:24:00 GMT-0800 (Pacific Standard Time)', }`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id: 6, group: "Build Airplane", task: "Go to Home Depot", dependencyIds: [1, 3, 4], completedAt: 'Sun Dec 17 1995 03:24:00 GMT-0800 (Pacific Standard Time)' }`

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Item cannot be updated" }`

- **Sample Call:**
  ```javascript
  $.ajax({
    url: "/items/1",
    dataType: "json",
    type: "PUT",
    success: function(r) {
      console.log(r);
    }
  });
  ```

## **Get All Groups**

Returns an object containing group name as the keys and array of items as the values;

- **URL**

  /groups/all

- **Method:**

  `GET`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ 'Purchases': [ { id: 1, group: "Purchases", task: "Go to the bank", dependencyIds: [], completedAt: null, }, { id: 2, group: "Purchases", task: "Buy hammer", dependencyIds: [1], completedAt: null, }, { id: 3, group: "Purchases", task: "Buy wood", dependencyIds: [1], completedAt: null, } ], 'Build Airplane': [ { id: 6, group: "Build Airplane", task: "Hammer nails into wood", dependencyIds: [2, 3, 4], completedAt: null, }, { id: 7, group: "Build Airplane", task: "Paint wings", dependencyIds: [5, 6], completedAt: null, }, { id: 8, group: "Build Airplane", task: "Have a snack", dependencyIds: [], completedAt: null, } ] } ;`

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Groups cannot be found." }`

- **Sample Call:**
  ```javascript
  $.ajax({
    url: "/groups/all",
    dataType: "json",
    type: "GET",
    success: function(r) {
      console.log(r);
    }
  });
  ```
