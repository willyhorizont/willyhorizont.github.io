const donationPlatforms = [
    [
        "https://trakteer.id/p3thvx/link?open=true",
        "Trakteer",
        "https://trakteer.id/favicon/favicon-32x32.png",
    ],
    [
        "https://saweria.co/p3thvx",
        "Saweria",
        "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://saweria.co&client=VFE&size=64&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2",
    ],
    [
        "https://sociabuzz.com/p3thvx",
        "Sociabuzz",
        "https://storage.sociabuzz.com/storage/img/tribe/logo.png",
    ],
    [
        "https://www.nihbuatjajan.com/p3thvx",
        "Nih Buat Jajan",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxp6o2dSrvX4XsYqykH8l5-APqtOuniis61Q&s",
    ],
    [
        "https://nyawer.co/p3thvx",
        "Nyawer",
        "https://nyawer.co/favicon_io/favicon.ico",
    ],
    [
        "https://karyakarsa.com/p3thvx/support",
        "Karyakarsa",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABEklEQVR4Ae3WgQbCQBwG8CWlF5hQMECGnqAABQUphgqIAlYAAj1B1CPEAgoIgukZ9gIVgKBRJf27jwZSV9d1yD4+wza/3d2O04p2SWnVgiFItc6MdfJhZ1RppURB+rjVdo9K9agakIPJBM/Agvd+De6DkckC+Vi5EeNiEsAzH5MJ8qdRHsj5QeSC/XTmqmlaVg24XNF4NKJIPH5iaPJ3YLNLwOhyIQQoAz2gksFHLIht25jaKVCp4HG+eMAQ3/c5qAA4zBVos17Ts+CeZVkHBg5YE1+DhmG8BBHP8wK0owREXNcl0zR3DM1/DWIEWK9XxRo7jkN4HqgwiP2m6/r2nWKEuN63S0IIxNcKNvm/p7YQvAHhLWgqT/E0/AAAAABJRU5ErkJggg==",
    ],
].map(([donationPlatformUrl, donationPlatformName, donationPlatformLogoSource]) => ((/*html*/`
            <div class="link-container">
                <a target="_blank" rel="noopener noreferrer" href="${donationPlatformUrl}" aria-label="${donationPlatformName}">
                    <div class="link-fragment">
                        <p class="link-fragment-support-text-prefix">Support me via</p>
                        <div class="link-fragment-provider">
                            <img class="link-fragment-provider-image" alt="${donationPlatformName}'s logo" src="${donationPlatformLogoSource}" />
                            <p class="link-fragment-provider-name">${donationPlatformName}</p>
                        </div>
                    </div>
                </a>
            </div>
`).trim())).join("\n            ");

document.getElementById("placeholder-link").innerHTML = (/*html*/`
    <div class="link-section">
        <div class="link-paper">
            ${donationPlatforms}
        </div>
    </div>`).trim();
