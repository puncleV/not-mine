**Minesweeper, the game API**


Simple REST API for minesweeper game.

#### > POST /start
```json
{
    "grid_size": {
        "x": INT,
        "y": INT
    },
    "bomb_quantity": INT
}
```

*response*
```json
{
    "game_id": STRING
}
```

#### > POST /select
```json
{
    "game_id": STRING,
    "grid_position": {
        "x": INT,
        "y": INT
    }
}
```

*response*
```json
{
    "results": [
        {
            "x": INT,
            "y": INT,
            "value": INT
        },
        {
            "x": INT,
            "y": INT,
            "value": INT
        },
        ...
    ]
}
```

The response should contain a results key that contains a list of grid
positions and values to be revealed by the client. The values should indicate:

- -1, mine, the player loses the game
- 0, 1, 2, 3,..., 8 number square representing number of nearby mines

###### Example

If I were to send my opening move of

```json
{
    "game_id": "q83ygfqwiuygf",
    "grid_position": {
        "x": 1,
        "y": 0
    }
}
```

I could get back something like

```json
{
    "results": [
        {
            "x": 0,
            "y": 0,
            "value": 0
        },
        {
            "x": 1,
            "y": 0,
            "value": 0
        },
        {
            "x": 2,
            "y": 0,
            "value": 2
        },
        {
            "x": 0,
            "y": 1,
            "value": 1
        },
        {
            "x": 1,
            "y": 1,
            "value": 2
        },
        {
            "x": 2,
            "y": 1,
            "value": 4
        }
    ]
}
```
