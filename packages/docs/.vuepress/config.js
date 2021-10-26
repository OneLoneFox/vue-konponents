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
                    { text: 'Components', link: '/components/' },
                    // external link to git repo...again
                    { text: 'GitHub', link: '' }
                ],
                sidebar: {
                    '/components/': [
                        {
                            title: 'Components',
                            collapsable: false,
                            children: [
                                'KonButton',
                                'KonSelect',
                                'KonSelectMultiple',
                                'KonStepper',
                                'KonInput',
                                'KonCheckbox',
                                'KonSwitch',
                                'KonRadio',
                                'KonCollapse',
                            ]
                        }
                    ]
                }
            }
        },
    }
}