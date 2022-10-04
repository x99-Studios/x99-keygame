local isPlaying = false
local result = nil

RegisterCommand("minigame", function()
    local letters = {
        "Q",
        "W",
        "E",
        "R",
    }
    local test = playMinigame(letters, 3, 3, 1.5, 1, 1)
end)

function playMinigame(letters, maxwin, maxlife, letterspeed, goldletterspeed, progressbarTime)
    if not isPlaying then 
        isPlaying = true
        TriggerEvent("yavzu:StartMinigame", letters, maxwin, maxlife, letterspeed, goldletterspeed, progressbarTime)
        while isPlaying do
            Citizen.Wait(100)
        end
        print("result: ")
        print(result)
        return result
    end
end

RegisterNetEvent("yavzu:StartMinigame")
AddEventHandler("yavzu:StartMinigame", function(letters, maxwin, maxlife, letterspeed, goldletterspeed, progressbarTime)
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "startKeyGame",
        harfler = letters,
        maxwin = maxwin,
        cansayisi = maxlife,
        normalspeed = tonumber(letterspeed),
        yellowspeed = tonumber(goldletterspeed),
        progressTime = progressbarTime
    })
end)

RegisterNUICallback("keygameStop", function(data, cb)
    SetNuiFocus(false, false)
    result = data.result
    isPlaying = false
end)


exports("playMinigame", playMinigame)