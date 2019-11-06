//
// Jäsentää Food&Co ravintolan API:n tarjoaman vastauksen.
//
// Parametri action:
// - today: hae tämän päivän ruokalista
// - tomorrow: hae huomisen ruokalista
// - tyhjä: palautetaan kaikkien päivien ruokalistat
// 
// Vastauksen muoto
// {
//     restaurant: <Ravintolan nimi>,
//     days: [
//         {
//             date: <päiväys ISO-muodossa>
//             times: <lounasajat, vapaamuotoinen merkkijono>,
//             menus: [
//                 name: <linjaston nimi>,
//                 components: <linjaston menu-vaihtoehdot>
//             ]
//         }
//     ]
// }
//

const parseData = (data, action) => {
    const result = {
        restaurant: data.RestaurantName,
    };

    const days = data.MenusForDays;

    const today = new Date()

    switch (action) {
        case 'today':
            result.days = [parseDayMenu(findDayMenu(days, today), today)];
            break;
        case 'tomorrow':
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            result.days = [parseDayMenu(findDayMenu(days, tomorrow), tomorrow)];
            break;
        case undefined:
            result.days = days.map(menu => {
                return parseDayMenu(menu);
            });
            break;
        default:
            return { error: "Error" };
    }
    return result;
};


const findDayMenu = (days, date) => {
    dateStr = date.toISOString();
    const result = {}

    const menu = days.find(elem => elem.Date.slice(0, 10) == dateStr.slice(0, 10));
    return menu
}


const parseDayMenu = (menu) => {
    const result = {}

    if (menu) {
        result.date = menu.Date;
        result.times = menu.LunchTime;
        result.menus = menu.SetMenus.map(elem => ({
            name: elem.Name,
            components: elem.Components
        }))
    } else {
        result = {};
    }
    return result
}

module.exports = { parseData, parseDayMenu, findDayMenu };