![image](http://cdn.x99studio.com/blackattack/2022-10/x99Banner.png)
### x99 KeyGame
A minigame that you have to press if the incoming letters are green. If they are red, you will lose one attempt.

<p align="center">
    <a href="https://discord.gg/vcrKbKVAbc">
        <img src="http://cdn.x99studio.com/blackattack/2022-10/join_discord.png" width="250">
    </a>
</p>


## KeyGame

```
RegisterCommand("minigame", function()
    local letters = {
        "Q",
        "W",
        "E",
        "R",
    }
    -- Arguments: playMinigame(letters, maxwin, maxlife, letterspeed, goldletterspeed, progressbarTime)
    local game = exports["x99-minigame"]:playMinigame(letters, 3, 3, 1.5, 1, 1)
    if game == true then 
        print("You won!")
    else
        print("You lost!")
    end
end)
```



https://user-images.githubusercontent.com/42780579/193874291-7d032710-e64e-49fe-9696-df15b4019b7f.mp4

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
discord, or any other method with the owners of this repository before making a change. We'd love
your help with any of the following:

* Reporting a bug
* Discussing the current state of the code
* Submitting a fix
* Proposing new features

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process

1. Fork the repository and create your branch from `main`.
2. Implement the changes and test it.
3. Test it again.
4. Issue that pull request!

