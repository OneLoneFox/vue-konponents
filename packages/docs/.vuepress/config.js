let components = [
    {text: 'Button', slug: 'KonButton'},
    {text: 'Select', slug: 'KonSelect'},
    {text: 'Select multiple', slug: 'KonSelectMultiple'},
    {text: 'Stepper', slug: 'KonStepper'},
    {text: 'Input', slug: 'KonInput'},
    {text: 'Checkbox', slug: 'KonCheckbox'},
    {text: 'Switch', slug: 'KonSwitch'},
    {text: 'Radio', slug: 'KonRadio'},
    {text: 'Collapse', slug: 'KonCollapse'},
    {text: 'Modal', slug: 'KonModal'},
];

/**
 * 
 * @param {string} prefix - The link prefix (must NOT end with /)
 * @param {object[]} items - The components to map
 * @returns object[]
 */
function getNavbarComponents(prefix, items){
    return items.map((item) => {
        return {
            text: item.text,
            link: `${prefix}/${item.slug}`
        };
    });
}

module.exports = {
    head: [
        [
            'link', 
            {
                rel: 'stylesheet',
                href: 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css'
            }
        ],
    ],
    themeConfig: {
        sidebarDepth: 0,
        repo: '',
        editLinks: true,
        search: false,
        docsDir: 'docs',
        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                lastUpdated: 'Last Updated',
                // service worker is configured but will only register in production
                serviceWorker: {
                    updatePopup: {
                        message: 'New content is available.',
                        buttonText: 'Refresh'
                    }
                },
                nav: [
                    { text: 'Getting Started', link: '/guide' },
                    { 
                        text: 'Components',
                        link: '/components/',
                        items: getNavbarComponents('/components', components),
                    },
                    // external link to git repo...again
                    { text: 'GitHub', link: '' }
                ],
                sidebar: {
                    '/components/': [
                        {
                            title: 'Components',
                            collapsable: false,
                            children: components.map(x => x.slug),
                        }
                    ]
                }
            }
        },
    }
}