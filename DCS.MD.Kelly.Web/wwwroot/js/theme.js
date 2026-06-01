window.themeInterop = {
    applyTheme: function () {
        const month = new Date().getMonth() + 1;
        let season;

        if (month >= 3 && month <= 5) season = 'spring';
        else if (month >= 6 && month <= 8) season = 'summer';
        else if (month >= 9 && month <= 11) season = 'autumn';
        else season = 'winter';

        document.body.classList.remove('spring', 'summer', 'autumn', 'winter');
        document.body.classList.add(season);

        return season;
    }
};