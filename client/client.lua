

local keyGameDurum = false
local bitisEvent = ""

RegisterCommand("keygame", function()
    local finishevent = "kafi:keyGame:Napim"
    local maxwin = 3
    local harfler = {
        harf1 = "Q",
        harf2 = "W",
        harf3 = "E"
    }
    TriggerEvent("kafi:keyGame:start", harfler, maxwin, 5, 3, 1, finishevent)
end)

function keyGameStart(harfler, maxwin, maxcan, harfhizi, altinharfhizi, yuklemesuresi)
    keygame = true
    SetNuiFocus(true, true)
    local minigameharfleri = {
        harf1 = harfler.harf1,
        harf2 = harfler.harf2,
        harf3 = harfler.harf3
    } 
    if (minigameharfleri.harf1 and minigameharfleri.harf2 and minigameharfleri.harf3) ~= nil then
        -- print(harfhizi) 
        -- print(altinharfhizi) 
        SendNUIMessage({
            action = "startKeyGame",
            maxwin = maxwin,
            cansayisi = maxcan,
            harfler = minigameharfleri,
            normalspeed = tonumber(harfhizi),
            yellowspeed = tonumber(altinharfhizi),
            progressTime = yuklemesuresi
        })
    else
        TriggerEvent("notification", "Harflerde sorun var!", 2)
    end
end

RegisterNUICallback("keygameStop", function(data, cb)
    SetNuiFocus(false, false)
    keygame = false
    if data.sonuc then 
        TriggerEvent("notification", "Başarılı", 1)
        TriggerEvent(""..bitisEvent.."")
    else
        TriggerEvent("notification", "Kaybettin", 2)
    end
end)

RegisterNetEvent("kafi:keyGame:start")
AddEventHandler("kafi:keyGame:start", function(harfler, maxwin, maxcan, harfhizi, altinharfhizi, finishevent, cooldown, yuklemesuresi)
    if not keygame then
        bitisEvent = finishevent
        if cooldown ~= nil then
            Citizen.Wait(cooldown)
            keyGameStart(harfler, maxwin, maxcan, harfhizi, altinharfhizi, yuklemesuresi)
        else
            keyGameStart(harfler, maxwin, maxcan, harfhizi, altinharfhizi, yuklemesuresi)
        end
    else
        TriggerEvent("notification", "Oyun zaten aktif..", 2)   
    end
end)

function minigamedurum()
    return keygame
end


