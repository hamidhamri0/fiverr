export const deliveryTimeOptions = [
  '1 DAY DELIVERY',
  '2 DAYS DELIVERY',
  '3 DAYS DELIVERY',
  '4 DAYS DELIVERY',
  '5 DAYS DELIVERY',
  '6 DAYS DELIVERY',
  '7 DAYS DELIVERY',
  '14 DAYS DELIVERY',
  '21 DAYS DELIVERY',
  '28 DAYS DELIVERY',
  '35 DAYS DELIVERY',
  '42 DAYS DELIVERY',
  '49 DAYS DELIVERY',
  '56 DAYS DELIVERY',
  '63 DAYS DELIVERY',
  '70 DAYS DELIVERY',
  '77 DAYS DELIVERY',
  '84 DAYS DELIVERY',
  '91 DAYS DELIVERY',
  '98 DAYS DELIVERY',
];

export const categories = [
  {
    name: 'Tech & Programming',
    image:
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/67119574fcb6178f7b270ef6e50d2ff5-1689143601915/Programming%20_%20Tech-%20desktop.png',
    subcategoryGroups: [
      {
        subcategoryGroup: 'Websites',
        image:
          'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/3baf91d2ca0c49f0973f2f9e3e210f86-1682409420385/Website%20Development.png',
        subcategories: [
          {
            name: 'Web Development',
            features: [
              {
                name: 'Frontend Framework',
                type: 'select',
                options: [
                  'React',
                  'Angular',
                  'Vue.js',
                  'Svelte',
                  'Next.js',
                  'Nuxt.js',
                ],
              },
              {
                name: 'Backend Technology',
                type: 'select',
                options: [
                  'Node.js',
                  'Python',
                  'Ruby on Rails',
                  'PHP',
                  'Java',
                  '.NET',
                ],
              },
              {
                name: 'Database',
                type: 'select',
                options: [
                  'MySQL',
                  'PostgreSQL',
                  'MongoDB',
                  'Firebase',
                  'SQLite',
                  'Oracle',
                ],
              },
              {
                name: 'Responsive Design',
                type: 'select',
                options: ['Yes', 'No'],
              },
              {
                name: 'SEO Optimization',
                type: 'select',
                options: ['Basic', 'Advanced', 'None'],
              },
              {
                name: 'Performance Optimization',
                type: 'checkbox',
                options: null,
              },
            ],
            services: [
              {
                name: 'Full-Stack Web Development',
                image: 'https://static.thenounproject.com/png/5110224-200.png',
                metadata: [
                  {
                    name: 'Project Complexity',
                    type: 'select',
                    tags: ['Simple', 'Medium', 'Complex'],
                  },
                  {
                    name: 'Development Time',
                    type: 'select',
                    tags: ['1-2 weeks', '2-4 weeks', '1-2 months', '2+ months'],
                  },
                  {
                    name: 'Additional Features',
                    type: 'multi_select',
                    tags: [
                      'User Authentication',
                      'Payment Integration',
                      'Third-party API Integration',
                      'Real-time Features',
                      'Multilingual Support',
                    ],
                  },
                ],
              },
              {
                name: 'Frontend Development',
                image: `https://static.vecteezy.com/system/resources/previews/007/571/212/non_2x/frontend-development-line-icon-vector.jpg`,
                metadata: [
                  {
                    name: 'UI Framework',
                    type: 'select',
                    tags: [
                      'Material-UI',
                      'Bootstrap',
                      'Tailwind CSS',
                      'Custom',
                    ],
                  },
                  {
                    name: 'State Management',
                    type: 'select',
                    tags: ['Redux', 'MobX', 'Vuex', 'Context API', 'Recoil'],
                  },
                  {
                    name: 'Animation Library',
                    type: 'select',
                    tags: [
                      'GSAP',
                      'Framer Motion',
                      'Anime.js',
                      'Lottie',
                      'None',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'E-commerce Development',
            features: [
              {
                name: 'Platform',
                type: 'select',
                options: [
                  'WooCommerce',
                  'Shopify',
                  'Magento',
                  'BigCommerce',
                  'Custom Solution',
                  'Prestashop',
                ],
              },
              {
                name: 'Payment Gateways',
                type: 'checkbox',
                options: null,
              },
              {
                name: 'Inventory Management',
                type: 'select',
                options: ['Basic', 'Advanced', 'None'],
              },
              {
                name: 'Shipping Integration',
                type: 'checkbox',
                options: null,
              },
              {
                name: 'Analytics and Reporting',
                type: 'select',
                options: ['Basic', 'Advanced', 'Custom'],
              },
            ],
            services: [
              {
                name: 'Custom E-commerce Solution',
                image: `https://static.thenounproject.com/png/3794299-200.png`,
                metadata: [
                  {
                    name: 'Number of Products',
                    type: 'select',
                    tags: ['1-100', '101-1000', '1001-10000', '10000+'],
                  },
                  {
                    name: 'Design Customization',
                    type: 'select',
                    tags: ['Template Customization', 'Fully Custom Design'],
                  },
                  {
                    name: 'Additional Features',
                    type: 'multi_select',
                    tags: [
                      'Wishlist',
                      'Product Reviews',
                      'Loyalty Program',
                      'Abandoned Cart Recovery',
                      'Multi-currency Support',
                    ],
                  },
                ],
              },
              {
                name: 'E-commerce Migration',
                image: `https://www.shutterstock.com/image-vector/data-migration-icon-logo-sign-600nw-2482998929.jpg`,
                metadata: [
                  {
                    name: 'Source Platform',
                    type: 'select',
                    tags: [
                      'Magento',
                      'WooCommerce',
                      'Shopify',
                      'Custom',
                      'Other',
                    ],
                  },
                  {
                    name: 'Data Migration Scope',
                    type: 'multi_select',
                    tags: [
                      'Products',
                      'Customers',
                      'Orders',
                      'Reviews',
                      'SEO URLs',
                    ],
                  },
                  {
                    name: 'Downtime',
                    type: 'select',
                    tags: [
                      'No Downtime',
                      'Minimal Downtime',
                      'Scheduled Downtime',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Website Maintenance',
            features: [
              {
                name: 'Update Frequency',
                type: 'select',
                options: ['Weekly', 'Bi-weekly', 'Monthly', 'Quarterly'],
              },
              {
                name: 'Security Monitoring',
                type: 'select',
                options: ['24/7', 'Daily', 'Weekly', 'None'],
              },
              {
                name: 'Backup Frequency',
                type: 'select',
                options: ['Daily', 'Weekly', 'Monthly', 'On-demand'],
              },
              {
                name: 'Performance Optimization',
                type: 'select',
                options: ['Included', 'On-request', 'Not Included'],
              },
              {
                name: 'Content Updates',
                type: 'select',
                options: ['Included', 'Limited', 'Not Included'],
              },
              {
                name: 'Technical Support',
                type: 'select',
                options: ['24/7', 'Business Hours', 'Limited', 'None'],
              },
            ],
            services: [
              {
                name: 'Comprehensive Maintenance Package',
                image: `https://cdn-icons-png.flaticon.com/512/868/868824.png`,
                metadata: [
                  {
                    name: 'Website Type',
                    type: 'select',
                    tags: ['Static', 'Dynamic', 'E-commerce', 'CMS-based'],
                  },
                  {
                    name: 'Traffic Volume',
                    type: 'select',
                    tags: ['Low', 'Medium', 'High', 'Enterprise-level'],
                  },
                  {
                    name: 'Additional Services',
                    type: 'multi_select',
                    tags: [
                      'SEO Monitoring',
                      'Analytics Reporting',
                      'User Experience Optimization',
                      'Third-party Integration Management',
                    ],
                  },
                ],
              },
              {
                name: 'Security Audit and Patching',
                image: `https://static.vecteezy.com/system/resources/thumbnails/039/886/002/small_2x/security-audit-icon-line-illustration-vector.jpg`,
                metadata: [
                  {
                    name: 'Audit Frequency',
                    type: 'select',
                    tags: ['Monthly', 'Quarterly', 'Bi-annually', 'Annually'],
                  },
                  {
                    name: 'Vulnerability Scanning',
                    type: 'select',
                    tags: ['Automated', 'Manual', 'Both'],
                  },
                  {
                    name: 'Patch Management',
                    type: 'select',
                    tags: ['Critical Only', 'All Updates', 'Custom Schedule'],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        subcategoryGroup: 'Application Development',
        image:
          'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/529ea44f10a2aff520b99859d285b968-1682409451031/Application%20Development.png',
        subcategories: [
          {
            name: 'Mobile App Development',
            features: [
              {
                name: 'Platform',
                type: 'select',
                options: ['iOS', 'Android', 'Cross-platform'],
              },
              {
                name: 'Development Approach',
                type: 'select',
                options: ['Native', 'Hybrid', 'PWA'],
              },
              {
                name: 'UI Framework',
                type: 'select',
                options: [
                  'React Native',
                  'Flutter',
                  'Xamarin',
                  'Native UI',
                  'Ionic',
                  'SwiftUI',
                ],
              },
              {
                name: 'Backend Integration',
                type: 'select',
                options: [
                  'REST API',
                  'GraphQL',
                  'Firebase',
                  'Custom Backend',
                  'Serverless',
                ],
              },
              {
                name: 'Authentication',
                type: 'checkbox',
                options: null,
              },
              {
                name: 'Offline Functionality',
                type: 'select',
                options: ['Full', 'Partial', 'Online Only'],
              },
            ],
            services: [
              {
                name: 'Custom Mobile App Development',
                image: `https://cdn-icons-png.flaticon.com/512/15/15579.png`,
                metadata: [
                  {
                    name: 'App Complexity',
                    type: 'select',
                    tags: ['Simple', 'Moderate', 'Complex', 'Enterprise'],
                  },
                  {
                    name: 'Design Requirements',
                    type: 'select',
                    tags: [
                      'Basic UI',
                      'Custom Design',
                      'Animations',
                      'Branding Integration',
                    ],
                  },
                  {
                    name: 'Additional Features',
                    type: 'select',
                    tags: [
                      'Push Notifications',
                      'In-app Purchases',
                      'Analytics Integration',
                      'AR Features',
                      'Geolocation',
                    ],
                  },
                ],
              },
              {
                name: 'App Store Optimization',
                image: `https://thumbs.dreamstime.com/z/app-store-optimization-isolated-vector-icon-which-can-easily-modify-edit-app-store-optimization-isolated-vector-icon-which-can-209561012.jpg`,
                metadata: [
                  {
                    name: 'Target Stores',
                    type: 'select',
                    tags: [
                      'Apple App Store',
                      'Google Play Store',
                      'Huawei AppGallery',
                    ],
                  },
                  {
                    name: 'Optimization Scope',
                    type: 'multi_select',
                    tags: [
                      'Keyword Optimization',
                      'Visual Asset Optimization',
                      'Review Management',
                      'Competitor Analysis',
                    ],
                  },
                  {
                    name: 'Localization',
                    type: 'select',
                    tags: ['Single Language', 'Multi-language', 'Global'],
                  },
                ],
              },
            ],
          },
          {
            name: 'Desktop Application Development',
            features: [
              {
                name: 'Operating System',
                type: 'select',
                options: ['Windows', 'macOS', 'Linux'],
              },
              {
                name: 'Development Framework',
                type: 'select',
                options: [
                  'Electron',
                  'Qt',
                  '.NET',
                  'JavaFX',
                  'wxWidgets',
                  'Native',
                ],
              },
              {
                name: 'UI Design',
                type: 'select',
                options: ['Modern', 'Classic', 'Custom'],
              },
              {
                name: 'Database Integration',
                type: 'select',
                options: ['SQLite', 'MySQL', 'PostgreSQL', 'MongoDB', 'None'],
              },
              {
                name: 'Networking',
                type: 'select',
                options: [
                  'Internet Connectivity',
                  'Local Network',
                  'Bluetooth',
                  'API Integration',
                  'P2P',
                ],
              },
              {
                name: 'Deployment Method',
                type: 'select',
                options: [
                  'Installer',
                  'Portable',
                  'App Store',
                  'Web-based Installer',
                ],
              },
            ],
            services: [
              {
                name: 'Custom Desktop Application',
                image: `https://cdn-icons-png.freepik.com/512/73/73465.png`,
                metadata: [
                  {
                    name: 'Application Type',
                    type: 'select',
                    tags: [
                      'Productivity Tool',
                      'Media Player',
                      'Development Tool',
                      'System Utility',
                      'Business Software',
                    ],
                  },
                  {
                    name: 'Licensing Model',
                    type: 'select',
                    tags: [
                      'One-time Purchase',
                      'Subscription',
                      'Freemium',
                      'Open Source',
                    ],
                  },
                  {
                    name: 'Additional Features',
                    type: 'select',
                    tags: [
                      'Auto-update',
                      'Offline Mode',
                      'Multi-language Support',
                      'Cloud Sync',
                      'Plugin System',
                    ],
                  },
                ],
              },
              {
                name: 'Cross-platform Desktop Development',
                image: `https://img.myloview.com/stickers/cross-platform-linear-icon-modern-outline-cross-platform-logo-concept-on-white-background-from-programming-collection-400-148366067.jpg`,
                metadata: [
                  {
                    name: 'Target Platforms',
                    type: 'multi_select',
                    tags: ['Windows', 'macOS', 'Linux'],
                  },
                  {
                    name: 'UI Consistency',
                    type: 'select',
                    tags: [
                      'Platform-specific',
                      'Consistent across platforms',
                      'Hybrid approach',
                    ],
                  },
                  {
                    name: 'Performance Optimization',
                    type: 'multi_select',
                    tags: [
                      'Memory usage',
                      'CPU optimization',
                      'Startup time',
                      'Graphics acceleration',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Web Application Development',
            features: [
              {
                name: 'Frontend Framework',
                type: 'select',
                options: [
                  'React',
                  'Angular',
                  'Vue.js',
                  'Svelte',
                  'Ember.js',
                  'Backbone.js',
                ],
              },
              {
                name: 'Backend Framework',
                type: 'select',
                options: [
                  'Express.js',
                  'Django',
                  'Ruby on Rails',
                  'ASP.NET Core',
                  'Spring Boot',
                  'Laravel',
                ],
              },
              {
                name: 'Database',
                type: 'select',
                options: [
                  'PostgreSQL',
                  'MySQL',
                  'MongoDB',
                  'Redis',
                  'Elasticsearch',
                  'Cassandra',
                ],
              },
              {
                name: 'Authentication',
                type: 'checkbox',
                options: null,
              },
              {
                name: 'API Architecture',
                type: 'select',
                options: [
                  'RESTful',
                  'GraphQL',
                  'gRPC',
                  'WebSocket',
                  'Webhook',
                  'SOAP',
                ],
              },
              {
                name: 'Deployment',
                type: 'select',
                options: [
                  'Docker',
                  'Kubernetes',
                  'Serverless',
                  'Traditional VPS',
                  'PaaS',
                  'Hybrid',
                ],
              },
            ],
            services: [
              {
                name: 'Enterprise Web Application',
                image: `https://cdn1.iconfinder.com/data/icons/seo-and-web-outline-19/64/seo-and-web-outline-19-06-512.png`,
                metadata: [
                  {
                    name: 'Application Scale',
                    type: 'select',
                    tags: ['Startup', 'SMB', 'Enterprise', 'Global'],
                  },
                  {
                    name: 'Integration Requirements',
                    type: 'multi_select',
                    tags: [
                      'CRM',
                      'ERP',
                      'Payment Gateway',
                      'Third-party APIs',
                      'Legacy Systems',
                    ],
                  },
                  {
                    name: 'Performance Requirements',
                    type: 'select',
                    tags: [
                      'Standard',
                      'High Performance',
                      'Real-time',
                      'High Concurrency',
                    ],
                  },
                ],
              },
              {
                name: 'Progressive Web App Development',
                image: `https://static.thenounproject.com/png/2534021-200.png`,
                metadata: [
                  {
                    name: 'Offline Capabilities',
                    type: 'select',
                    tags: [
                      'Full offline support',
                      'Partial offline support',
                      'Online only',
                    ],
                  },
                  {
                    name: 'Push Notifications',
                    type: 'select',
                    tags: ['Enabled', 'Not required'],
                  },
                  {
                    name: 'App-like Features',
                    type: 'multi_select',
                    tags: [
                      'Home screen installation',
                      'Splash screen',
                      'Full-screen mode',
                      'Hardware access',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        subcategoryGroup: 'Software Development',
        image:
          'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef81b98de711dd7acf41673de41d9e68-1698847862069/Software%20Development.png',

        subcategories: [
          {
            name: 'Custom Software Development',
            features: [
              {
                name: 'Industry',
                type: 'select',
                options: [
                  'Healthcare',
                  'Finance',
                  'Education',
                  'E-commerce',
                  'Manufacturing',
                  'Logistics',
                ],
              },
              {
                name: 'Software Type',
                type: 'select',
                options: ['ERP', 'CRM', 'SCM', 'HRM', 'POS', 'Custom Solution'],
              },
              {
                name: 'Deployment Model',
                type: 'select',
                options: ['On-premises', 'Cloud-based', 'Hybrid', 'SaaS'],
              },
              {
                name: 'Integration Capability',
                type: 'select',
                options: [
                  'API',
                  'EDI',
                  'Webhooks',
                  'Database',
                  'Legacy Systems',
                  'Third-party Services',
                ],
              },
              {
                name: 'Scalability',
                type: 'select',
                options: ['Low', 'Medium', 'High', 'Enterprise-grade'],
              },
              {
                name: 'Customization Level',
                type: 'select',
                options: ['Low', 'Medium', 'High', 'Fully Custom'],
              },
            ],
            services: [
              {
                name: 'Enterprise Software Solution',
                image: `https://st4.depositphotos.com/2497303/23078/v/1600/depositphotos_230782664-stock-illustration-erp-system-enterprise-resource-planning.jpg`,
                metadata: [
                  {
                    name: 'Project Scope',
                    type: 'select',
                    tags: [
                      'Department-specific',
                      'Company-wide',
                      'Multi-company',
                      'Global Enterprise',
                    ],
                  },
                  {
                    name: 'Development Methodology',
                    type: 'select',
                    tags: ['Agile', 'Waterfall', 'Hybrid', 'DevOps'],
                  },
                  {
                    name: 'Support & Maintenance',
                    type: 'multi_select',
                    tags: [
                      '24/7 Support',
                      'Regular Updates',
                      'Training',
                      'Documentation',
                      'SLA',
                    ],
                  },
                ],
              },
              {
                name: 'Legacy System Modernization',
                image: `https://www.shutterstock.com/image-vector/legacy-system-icon-vector-logotype-260nw-1832621551.jpg`,
                metadata: [
                  {
                    name: 'Modernization Approach',
                    type: 'select',
                    tags: [
                      'Rehosting',
                      'Refactoring',
                      'Rearchitecting',
                      'Rebuilding',
                    ],
                  },
                  {
                    name: 'Data Migration',
                    type: 'select',
                    tags: [
                      'Full migration',
                      'Partial migration',
                      'Phased migration',
                    ],
                  },
                  {
                    name: 'Integration Strategy',
                    type: 'multi_select',
                    tags: [
                      'API-led connectivity',
                      'ESB',
                      'Microservices',
                      'Data virtualization',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'API Development & Integration',
            features: [
              {
                name: 'API Type',
                type: 'select',
                options: [
                  'REST',
                  'GraphQL',
                  'SOAP',
                  'gRPC',
                  'WebSocket',
                  'Webhook',
                ],
              },
              {
                name: 'Authentication',
                type: 'checkbox',
                options: null,
              },
              {
                name: 'Data Format',
                type: 'select',
                options: [
                  'JSON',
                  'XML',
                  'Protocol Buffers',
                  'YAML',
                  'CSV',
                  'Custom',
                ],
              },
              {
                name: 'Versioning Strategy',
                type: 'select',
                options: [
                  'URL',
                  'Header',
                  'Media Type',
                  'Query Parameter',
                  'None',
                ],
              },
              {
                name: 'Documentation',
                type: 'checkbox',
                options: null,
              },
              {
                name: 'Rate Limiting',
                type: 'select',
                options: ['None', 'Basic', 'Advanced', 'Custom'],
              },
            ],
            services: [
              {
                name: 'Custom API Development',
                image: `https://www.snapwire.co.uk/media/lrxbmtsr/api-integration.svg`,
                metadata: [
                  {
                    name: 'Integration Complexity',
                    type: 'select',
                    tags: ['Simple', 'Moderate', 'Complex', 'Enterprise'],
                  },
                  {
                    name: 'Performance Requirements',
                    type: 'select',
                    tags: [
                      'Standard',
                      'High-throughput',
                      'Low-latency',
                      'Real-time',
                    ],
                  },
                  {
                    name: 'Additional Features',
                    type: 'multi_select',
                    tags: [
                      'Caching',
                      'Analytics',
                      'Monitoring',
                      'Error Handling',
                      'Sandbox Environment',
                    ],
                  },
                ],
              },
              {
                name: 'API Integration Services',
                image: `https://previews.123rf.com/images/denysdrozd/denysdrozd2008/denysdrozd200800037/152918112-api-icon-vector-software-integration-illustration-sign-application-symbol.jpg`,
                metadata: [
                  {
                    name: 'Integration Type',
                    type: 'select',
                    tags: ['Point-to-Point', 'ESB', 'iPaaS', 'API Gateway'],
                  },
                  {
                    name: 'Data Transformation',
                    type: 'select',
                    tags: [
                      'Simple mapping',
                      'Complex transformation',
                      'Real-time ETL',
                    ],
                  },
                  {
                    name: 'Security Measures',
                    type: 'multi_select',
                    tags: [
                      'Encryption',
                      'API Key Management',
                      'OAuth implementation',
                      'IP Whitelisting',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Database Design & Development',
            features: [
              {
                name: 'Database Type',
                type: 'select',
                options: [
                  'Relational',
                  'NoSQL',
                  'NewSQL',
                  'Graph',
                  'Time-series',
                  'Spatial',
                ],
              },
              {
                name: 'DBMS',
                type: 'select',
                options: [
                  'MySQL',
                  'PostgreSQL',
                  'MongoDB',
                  'Cassandra',
                  'Oracle',
                  'SQL Server',
                ],
              },
              {
                name: 'Data Modeling',
                type: 'select',
                options: ['Conceptual', 'Logical', 'Physical', 'Dimensional'],
              },
              {
                name: 'Scalability Features',
                type: 'select',
                options: [
                  'Sharding',
                  'Replication',
                  'Partitioning',
                  'Indexing',
                  'Caching',
                  'Load Balancing',
                ],
              },
              {
                name: 'Data Security',
                type: 'select',
                options: [
                  'Encryption',
                  'Access Control',
                  'Auditing',
                  'Masking',
                  'Tokenization',
                  'Backup & Recovery',
                ],
              },
              {
                name: 'Performance Optimization',
                type: 'checkbox',
                options: null,
              },
            ],
            services: [
              {
                name: 'Enterprise Database Solution',
                image: `https://www.shutterstock.com/shutterstock/photos/2279375933/display_1500/stock-vector-enterprise-icon-from-marketing-collection-thin-linear-enterprise-data-business-outline-icon-2279375933.jpg`,
                metadata: [
                  {
                    name: 'Database Size',
                    type: 'select',
                    tags: [
                      'Small (< 100GB)',
                      'Medium (100GB - 1TB)',
                      'Large (1TB - 10TB)',
                      'Very Large (> 10TB)',
                    ],
                  },
                  {
                    name: 'Availability Requirements',
                    type: 'select',
                    tags: [
                      'Standard',
                      'High Availability',
                      'Disaster Recovery',
                      'Geo-redundant',
                    ],
                  },
                  {
                    name: 'Integration Needs',
                    type: 'multi_select',
                    tags: [
                      'ETL Processes',
                      'Data Warehousing',
                      'Business Intelligence',
                      'Legacy System Migration',
                      'Real-time Sync',
                    ],
                  },
                ],
              },
              {
                name: 'Database Migration Services',
                image: `https://st4.depositphotos.com/14846838/20514/v/450/depositphotos_205148546-stock-illustration-database-attached-folder-showcasing-data.jpg`,
                metadata: [
                  {
                    name: 'Migration Type',
                    type: 'select',
                    tags: [
                      'Homogeneous',
                      'Heterogeneous',
                      'Cloud Migration',
                      'Version Upgrade',
                    ],
                  },
                  {
                    name: 'Downtime Requirements',
                    type: 'select',
                    tags: [
                      'Zero Downtime',
                      'Minimal Downtime',
                      'Planned Downtime',
                      'Flexible',
                    ],
                  },
                  {
                    name: 'Data Validation',
                    type: 'multi_select',
                    tags: [
                      'Automated Testing',
                      'Manual Verification',
                      'Data Reconciliation',
                      'Performance Benchmarking',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        subcategoryGroup: 'Mobile Apps',
        image:
          'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/2e10aef5cce6986a6b9cf898dd6ac29b-1698847839877/Mobile%20Apps.png',
        subcategories: [
          {
            name: 'iOS App Development',
            features: [
              {
                name: 'Development Language',
                type: 'select',
                options: ['Swift', 'Objective-C', 'React Native', 'Flutter'],
              },
              {
                name: 'UI Framework',
                type: 'select',
                options: ['UIKit', 'SwiftUI', 'React Native UI', 'Flutter UI'],
              },
              {
                name: 'Device Support',
                type: 'select',
                options: [
                  'iPhone',
                  'iPad',
                  'Apple Watch',
                  'Apple TV',
                  'Mac Catalyst',
                ],
              },
              {
                name: 'iOS Version Support',
                type: 'select',
                options: [
                  'Latest Only',
                  'Latest + 1 Version Back',
                  'Latest + 2 Versions Back',
                  'Custom Range',
                ],
              },
              {
                name: 'App Store Optimization',
                type: 'select',
                options: ['Basic', 'Advanced', 'Full Package', 'None'],
              },
              {
                name: 'In-App Purchases',
                type: 'select',
                options: [
                  'None',
                  'Consumable',
                  'Non-Consumable',
                  'Auto-Renewable Subscriptions',
                  'Non-Renewing Subscriptions',
                ],
              },
            ],
            services: [
              {
                name: 'Custom iOS App Development',
                image: `https://d1uxiwmpc9j4yg.cloudfront.net/images/all/Mobile_App_Developmen_1687630594.png`,
                metadata: [
                  {
                    name: 'App Complexity',
                    type: 'select',
                    tags: ['Simple', 'Moderate', 'Complex', 'Enterprise'],
                  },
                  {
                    name: 'Design Requirements',
                    type: 'select',
                    tags: [
                      'Stock iOS Design',
                      'Custom UI/UX',
                      'Branded Experience',
                    ],
                  },
                  {
                    name: 'Integration Needs',
                    type: 'multi_select',
                    tags: [
                      'Backend API',
                      'Third-party Services',
                      'Apple Services (HealthKit, CloudKit, etc.)',
                      'Analytics',
                    ],
                  },
                ],
              },
              {
                name: 'iOS App Maintenance and Support',
                image: `https://cdn.iconscout.com/icon/premium/png-256-thumb/app-maintenance-4372525-3626404.png?f=webp&w=256`,
                metadata: [
                  {
                    name: 'Support Duration',
                    type: 'select',
                    tags: ['3 months', '6 months', '1 year', 'Ongoing'],
                  },
                  {
                    name: 'Update Frequency',
                    type: 'select',
                    tags: ['Monthly', 'Quarterly', 'Bi-annually', 'As Needed'],
                  },
                  {
                    name: 'Support Channels',
                    type: 'multi_select',
                    tags: ['Email', 'Phone', 'Ticketing System', 'Video Calls'],
                  },
                ],
              },
            ],
          },
          {
            name: 'Android App Development',
            features: [
              {
                name: 'Development Language',
                type: 'select',
                options: ['Kotlin', 'Java', 'React Native', 'Flutter'],
              },
              {
                name: 'UI Framework',
                type: 'select',
                options: [
                  'Android UI Toolkit',
                  'Jetpack Compose',
                  'React Native UI',
                  'Flutter UI',
                ],
              },
              {
                name: 'Device Support',
                type: 'select',
                options: [
                  'Smartphones',
                  'Tablets',
                  'Android TV',
                  'Wear OS',
                  'Android Auto',
                ],
              },
              {
                name: 'Android Version Support',
                type: 'select',
                options: [
                  'Latest Only',
                  'Latest + 1 Version Back',
                  'Latest + 2 Versions Back',
                  'Custom Range',
                ],
              },
              {
                name: 'Play Store Optimization',
                type: 'select',
                options: ['Basic', 'Advanced', 'Full Package', 'None'],
              },
              {
                name: 'Monetization Strategy',
                type: 'select',
                options: [
                  'Free',
                  'Paid App',
                  'In-App Purchases',
                  'Subscriptions',
                  'Freemium',
                  'Ads',
                ],
              },
            ],
            services: [
              {
                name: 'Custom Android App Development',
                image: `https://www.vhv.rs/dpng/d/414-4149235_library-of-android-apple-phone-graphic-freeuse-png.png`,
                metadata: [
                  {
                    name: 'App Complexity',
                    type: 'select',
                    tags: ['Simple', 'Moderate', 'Complex', 'Enterprise'],
                  },
                  {
                    name: 'Design Requirements',
                    type: 'select',
                    tags: [
                      'Material Design',
                      'Custom UI/UX',
                      'Branded Experience',
                    ],
                  },
                  {
                    name: 'Integration Needs',
                    type: 'multi_select',
                    tags: [
                      'Backend API',
                      'Third-party Services',
                      'Google Services (Maps, Firebase, etc.)',
                      'Analytics',
                    ],
                  },
                ],
              },
              {
                name: 'Android App Performance Optimization',
                image: `https://cdn-icons-png.flaticon.com/512/5917/5917182.png`,
                metadata: [
                  {
                    name: 'Optimization Focus',
                    type: 'multi_select',
                    tags: [
                      'Battery Usage',
                      'Memory Management',
                      'Load Time',
                      'Smooth Animations',
                    ],
                  },
                  {
                    name: 'Testing Scope',
                    type: 'multi_select',
                    tags: [
                      'Unit Testing',
                      'Integration Testing',
                      'UI Testing',
                      'Performance Testing',
                    ],
                  },
                  {
                    name: 'Compatibility Range',
                    type: 'select',
                    tags: [
                      'Top 5 Devices',
                      'Top 10 Devices',
                      'Wide Range',
                      'Custom Selection',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Cross-Platform App Development',
            features: [
              {
                name: 'Development Framework',
                type: 'select',
                options: [
                  'React Native',
                  'Flutter',
                  'Xamarin',
                  'Ionic',
                  'PhoneGap/Cordova',
                ],
              },
              {
                name: 'Code Sharing',
                type: 'select',
                options: [
                  'Full',
                  'Partial (80%+)',
                  'Partial (50-80%)',
                  'Minimal (< 50%)',
                ],
              },
              {
                name: 'Platform Support',
                type: 'select',
                options: ['iOS', 'Android', 'Web', 'Windows', 'macOS'],
              },
              {
                name: 'Native Features Access',
                type: 'select',
                options: [
                  'Full',
                  'Limited',
                  'Via Plugins',
                  'Custom Modules Required',
                ],
              },
              {
                name: 'UI Consistency',
                type: 'select',
                options: [
                  'Platform-specific',
                  'Custom Unified',
                  'Hybrid Approach',
                ],
              },
              {
                name: 'Performance Optimization',
                type: 'checkbox',
                options: null,
              },
            ],
            services: [
              {
                name: 'Full-Stack Cross-Platform Development',
                image: `https://thumbs.dreamstime.com/b/cross-platform-app-black-line-icon-pictogram-web-page-mobile-promo-ui-ux-gui-design-element-editable-stroke-refers-to-181496709.jpg`,
                metadata: [
                  {
                    name: 'App Type',
                    type: 'select',
                    tags: [
                      'Consumer App',
                      'Enterprise Solution',
                      'Social Media',
                      'E-commerce',
                      'Educational',
                    ],
                  },
                  {
                    name: 'Backend Requirements',
                    type: 'select',
                    tags: [
                      'Serverless',
                      'Custom API',
                      'BaaS (Backend as a Service)',
                      'Hybrid',
                    ],
                  },
                  {
                    name: 'Offline Capabilities',
                    type: 'select',
                    tags: [
                      'Full Offline Support',
                      'Partial Offline Support',
                      'Online Only',
                    ],
                  },
                ],
              },
              {
                name: 'Cross-Platform to Native Migration',
                image: `https://img.freepik.com/premium-vector/cross-platform-icon-style_822882-2573.jpg`,
                metadata: [
                  {
                    name: 'Current Platform',
                    type: 'select',
                    tags: [
                      'React Native',
                      'Flutter',
                      'Xamarin',
                      'Ionic',
                      'PhoneGap/Cordova',
                    ],
                  },
                  {
                    name: 'Target Platforms',
                    type: 'multi_select',
                    tags: ['iOS Native', 'Android Native'],
                  },
                  {
                    name: 'Migration Strategy',
                    type: 'select',
                    tags: [
                      'Gradual Migration',
                      'Complete Rewrite',
                      'Hybrid Approach',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Graphics & Design',
    image:
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/509f310d48d17eafe768a87f78d10af8-1688626459703/G_D-%20Desktop%20banner.png',
    subcategoryGroups: [
      {
        subcategoryGroup: 'Logo & Brand Identity',
        image:
          'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/68011f21cd41c664951df861d9f876ac-1682402649968/Logo%20_%20Brand%20Identity.png',
        subcategories: [
          {
            name: 'Logo Design',
            features: [
              {
                name: 'Style',
                type: 'select',
                options: [
                  'Minimalist',
                  'Vintage',
                  'Hand-drawn',
                  'Abstract',
                  '3D',
                  'Mascot',
                ],
              },
              {
                name: 'Color Scheme',
                type: 'select',
                options: [
                  'Monochrome',
                  'Duo-tone',
                  'Multi-color',
                  'Gradient',
                  'Custom Palette',
                ],
              },
              {
                name: 'File Formats',
                type: 'select',
                options: ['AI', 'EPS', 'PDF', 'PNG', 'SVG', 'JPG'],
              },
              {
                name: 'Revisions',
                type: 'select',
                options: ['1', '2-3', '4-5', 'Unlimited'],
              },
              {
                name: 'Delivery Time',
                type: 'select',
                options: ['24 hours', '2-3 days', '4-7 days', 'Custom'],
              },
              {
                name: 'Additional Assets',
                type: 'select',
                options: [
                  'Favicon',
                  'Business Card Design',
                  'Social Media Kit',
                  'Brand Guidelines',
                ],
              },
            ],
            services: [
              {
                name: 'Custom Logo Design',
                image: `https://static.vecteezy.com/system/resources/previews/020/235/665/non_2x/graphic-design-icon-isolated-on-black-graphic-design-symbol-suitable-for-graphic-designers-and-websites-on-a-white-background-free-vector.jpg`,
                metadata: [
                  {
                    name: 'Complexity',
                    type: 'select',
                    tags: ['Simple', 'Moderate', 'Complex'],
                  },
                  {
                    name: 'Industry Focus',
                    type: 'select',
                    tags: [
                      'Technology',
                      'Food & Beverage',
                      'Fashion',
                      'Healthcare',
                      'Education',
                      'Custom',
                    ],
                  },
                  {
                    name: 'Brand Integration',
                    type: 'multi_select',
                    tags: [
                      'Color Matching',
                      'Font Consistency',
                      'Existing Brand Elements',
                      'Complete Redesign',
                    ],
                  },
                ],
              },
              {
                name: 'Logo Redesign',
                image: `https://cdn-icons-png.flaticon.com/512/5978/5978208.png`,
                metadata: [
                  {
                    name: 'Current Logo Analysis',
                    type: 'select',
                    tags: [
                      'Basic',
                      'Comprehensive',
                      'Competitive Analysis Included',
                    ],
                  },
                  {
                    name: 'Redesign Scope',
                    type: 'select',
                    tags: [
                      'Minor Update',
                      'Significant Changes',
                      'Complete Overhaul',
                    ],
                  },
                  {
                    name: 'Brand History Consideration',
                    type: 'select',
                    tags: [
                      'Maintain Legacy Elements',
                      'Modern Reinterpretation',
                      'Fresh Start',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Brand Style Guides',
            features: [
              {
                name: 'Guide Length',
                type: 'select',
                options: [
                  '1-5 pages',
                  '6-10 pages',
                  '11-20 pages',
                  '20+ pages',
                ],
              },
              {
                name: 'Elements Included',
                type: 'select',
                options: [
                  'Logo Usage',
                  'Color Palette',
                  'Typography',
                  'Imagery Style',
                  'Voice & Tone',
                  'Iconography',
                ],
              },
              {
                name: 'Format',
                type: 'select',
                options: ['PDF', 'Interactive PDF', 'Web-based', 'Print-ready'],
              },
              {
                name: 'Brand Applications',
                type: 'select',
                options: [
                  'Stationery',
                  'Social Media',
                  'Website',
                  'Packaging',
                  'Advertising',
                ],
              },
              {
                name: 'Customization Level',
                type: 'select',
                options: ['Basic', 'Standard', 'Premium', 'Enterprise'],
              },
              {
                name: 'Revisions',
                type: 'select',
                options: ['1', '2-3', '4-5', 'Unlimited'],
              },
            ],
            services: [
              {
                name: 'Comprehensive Brand Style Guide',
                image: `https://www.shutterstock.com/image-vector/book-pencil-scale-denoting-solid-260nw-2085467929.jpg`,
                metadata: [
                  {
                    name: 'Company Size',
                    type: 'select',
                    tags: [
                      'Startup',
                      'Small Business',
                      'Medium Enterprise',
                      'Large Corporation',
                    ],
                  },
                  {
                    name: 'Industry Specificity',
                    type: 'select',
                    tags: ['Generic', 'Industry-Specific', 'Niche Market'],
                  },
                  {
                    name: 'Digital Integration',
                    type: 'multi_select',
                    tags: [
                      'Web Style Guide',
                      'Social Media Guidelines',
                      'Email Marketing Templates',
                      'App Design Guidelines',
                    ],
                  },
                ],
              },
              {
                name: 'Brand Style Guide Update',
                image: `https://www.shutterstock.com/image-vector/brand-guidelines-icon-vector-illustration-260nw-2286019133.jpg`,
                metadata: [
                  {
                    name: 'Existing Guide Audit',
                    type: 'select',
                    tags: [
                      'Basic Review',
                      'Comprehensive Audit',
                      'Competitive Analysis',
                    ],
                  },
                  {
                    name: 'Update Scope',
                    type: 'multi_select',
                    tags: [
                      'Logo Refresh',
                      'Color Palette Expansion',
                      'Typography Update',
                      'New Brand Elements',
                    ],
                  },
                  {
                    name: 'Consistency Check',
                    type: 'select',
                    tags: [
                      'Basic Alignment',
                      'Thorough Consistency Review',
                      'Cross-Platform Verification',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Business Cards & Stationery',
            features: [
              {
                name: 'Print Type',
                type: 'select',
                options: [
                  'Digital',
                  'Offset',
                  'Letterpress',
                  'Foil Stamping',
                  'Embossing',
                ],
              },
              {
                name: 'Paper Type',
                type: 'select',
                options: [
                  'Standard',
                  'Recycled',
                  'Textured',
                  'Luxury',
                  'Custom',
                ],
              },
              {
                name: 'Card Shape',
                type: 'select',
                options: [
                  'Standard Rectangle',
                  'Square',
                  'Round Corners',
                  'Die-Cut',
                  'Folded',
                ],
              },
              {
                name: 'Finish',
                type: 'select',
                options: [
                  'Matte',
                  'Glossy',
                  'Soft-Touch',
                  'Metallic',
                  'Spot UV',
                ],
              },
              {
                name: 'Color Scheme',
                type: 'select',
                options: [
                  'Full Color',
                  'Black & White',
                  'Spot Color',
                  'Custom Pantone',
                ],
              },
              {
                name: 'Additional Items',
                type: 'select',
                options: [
                  'Letterhead',
                  'Envelopes',
                  'Notepads',
                  'Folders',
                  'Compliment Slips',
                ],
              },
            ],
            services: [
              {
                name: 'Custom Business Card Design',
                image: `https://e7.pngegg.com/pngimages/505/196/png-clipart-computer-icons-icon-design-exquisite-business-card-text-rectangle-thumbnail.png`,
                metadata: [
                  {
                    name: 'Design Complexity',
                    type: 'select',
                    tags: ['Simple', 'Moderate', 'Complex', 'Luxury'],
                  },
                  {
                    name: 'Printing Consultation',
                    type: 'select',
                    tags: [
                      'Not Included',
                      'Basic Advice',
                      'Full Printing Coordination',
                    ],
                  },
                  {
                    name: 'Turnaround Time',
                    type: 'select',
                    tags: [
                      'Standard (3-5 days)',
                      'Express (1-2 days)',
                      'Same Day',
                    ],
                  },
                ],
              },
              {
                name: 'Complete Stationery Package',
                image: `https://cdn-icons-png.flaticon.com/256/2997/2997950.png`,
                metadata: [
                  {
                    name: 'Package Contents',
                    type: 'select',
                    tags: [
                      'Business Cards',
                      'Letterhead',
                      'Envelopes',
                      'Notepads',
                      'Folders',
                    ],
                  },
                  {
                    name: 'Branding Consistency',
                    type: 'select',
                    tags: [
                      'Matched to Existing Brand',
                      'New Brand Creation',
                      'Brand Refresh',
                    ],
                  },
                  {
                    name: 'Digital Assets',
                    type: 'select',
                    tags: [
                      'Not Included',
                      'Basic Digital Formats',
                      'Comprehensive Digital Package',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        subcategoryGroup: 'Web & App Design',
        image:
          'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/68011f21cd41c664951df861d9f876ac-1682402649980/Web%20_%20App%20Design.png',
        subcategories: [
          {
            name: 'Website Design',
            features: [
              {
                name: 'Design Type',
                type: 'select',
                options: [
                  'Single Page',
                  'Multi-page',
                  'E-commerce',
                  'Portfolio',
                  'Blog',
                  'Corporate',
                ],
              },
              {
                name: 'Responsive Design',
                type: 'select',
                options: [
                  'Desktop Only',
                  'Desktop & Mobile',
                  'Fully Responsive',
                ],
              },
              {
                name: 'Number of Pages',
                type: 'select',
                options: ['1-3', '4-10', '11-20', '20+'],
              },
              {
                name: 'Design Software',
                type: 'select',
                options: ['Adobe XD', 'Figma', 'Sketch', 'InVision', 'Custom'],
              },
              {
                name: 'Interactive Elements',
                type: 'select',
                options: [
                  'Animations',
                  'Hover Effects',
                  'Parallax Scrolling',
                  'Video Integration',
                  'Custom Forms',
                ],
              },
              {
                name: 'Additional Features',
                type: 'select',
                options: [
                  'SEO Optimization',
                  'Accessibility Compliance',
                  'Multi-language Support',
                  'Dark Mode',
                  'Cookie Consent',
                ],
              },
            ],
            services: [
              {
                name: 'Custom Website Design',
                image: `https://cdn-icons-png.flaticon.com/512/3159/3159310.png`,
                metadata: [
                  {
                    name: 'Design Complexity',
                    type: 'select',
                    tags: ['Basic', 'Intermediate', 'Advanced', 'Custom'],
                  },
                  {
                    name: 'Branding Integration',
                    type: 'select',
                    tags: [
                      'Use Existing Brand',
                      'Brand Refresh',
                      'New Brand Creation',
                    ],
                  },
                  {
                    name: 'Delivery Format',
                    type: 'multi_select',
                    tags: [
                      'Mockups',
                      'Interactive Prototype',
                      'Design Handoff Files',
                      'Development-Ready Assets',
                    ],
                  },
                ],
              },
              {
                name: 'E-commerce Website Design',
                image: `https://cdn-icons-png.flaticon.com/512/1145/1145063.png`,
                metadata: [
                  {
                    name: 'Platform Compatibility',
                    type: 'select',
                    tags: [
                      'Shopify',
                      'WooCommerce',
                      'Magento',
                      'Custom Platform',
                    ],
                  },
                  {
                    name: 'Product Catalog Size',
                    type: 'select',
                    tags: [
                      'Small (1-50 products)',
                      'Medium (51-500 products)',
                      'Large (500+ products)',
                    ],
                  },
                  {
                    name: 'Checkout Process',
                    type: 'select',
                    tags: [
                      'Single Page',
                      'Multi-step',
                      'Guest Checkout',
                      'Custom',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'App Design',
            features: [
              {
                name: 'Platform',
                type: 'select',
                options: ['iOS', 'Android', 'Cross-platform'],
              },
              {
                name: 'App Type',
                type: 'select',
                options: ['Native', 'Hybrid', 'Web App'],
              },
              {
                name: 'Number of Screens',
                type: 'select',
                options: ['5-10', '11-20', '21-40', '40+'],
              },
              {
                name: 'Design System',
                type: 'select',
                options: ['Material Design', 'Apple Human Interface', 'Custom'],
              },
              {
                name: 'Prototyping',
                type: 'select',
                options: [
                  'Static Mockups',
                  'Click-through Prototype',
                  'Animated Prototype',
                ],
              },
              {
                name: 'Additional Features',
                type: 'select',
                options: [
                  'Dark Mode',
                  'Offline Functionality',
                  'Push Notifications',
                  'In-app Purchases',
                  'Social Integration',
                ],
              },
            ],
            services: [
              {
                name: 'Custom Mobile App Design',
                image: `https://cdn-icons-png.flaticon.com/512/3419/3419265.png`,
                metadata: [
                  {
                    name: 'Design Complexity',
                    type: 'select',
                    tags: ['Simple', 'Moderate', 'Complex', 'Enterprise-grade'],
                  },
                  {
                    name: 'User Experience (UX) Research',
                    type: 'select',
                    tags: [
                      'Not Included',
                      'Basic Research',
                      'Comprehensive UX Study',
                    ],
                  },
                  {
                    name: 'Delivery Assets',
                    type: 'multi_select',
                    tags: [
                      'UI Kit',
                      'Icon Set',
                      'Prototype',
                      'Design System Documentation',
                    ],
                  },
                ],
              },
              {
                name: 'App Redesign',
                image: `https://cdn-icons-png.flaticon.com/512/3419/3419265.png`,
                metadata: [
                  {
                    name: 'Redesign Scope',
                    type: 'select',
                    tags: [
                      'Visual Refresh',
                      'UX Overhaul',
                      'Complete Redesign',
                    ],
                  },
                  {
                    name: 'User Feedback Integration',
                    type: 'select',
                    tags: [
                      'Based on Provided Feedback',
                      'New User Testing',
                      'Data-Driven Analysis',
                    ],
                  },
                  {
                    name: 'Platform Update Compliance',
                    type: 'multi_select',
                    tags: [
                      'iOS Guidelines',
                      'Android Guidelines',
                      'Cross-platform Consistency',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'UX Design',
            features: [
              {
                name: 'Research Methods',
                type: 'select',
                options: [
                  'User Interviews',
                  'Surveys',
                  'Usability Testing',
                  'A/B Testing',
                  'Heatmaps',
                ],
              },
              {
                name: 'Deliverables',
                type: 'select',
                options: [
                  'User Personas',
                  'User Flows',
                  'Wireframes',
                  'Prototypes',
                  'Usability Reports',
                ],
              },
              {
                name: 'Scope',
                type: 'select',
                options: [
                  'Single Feature',
                  'Full Product',
                  'Multi-product Ecosystem',
                ],
              },
              {
                name: 'Fidelity',
                type: 'select',
                options: ['Low-fidelity', 'Mid-fidelity', 'High-fidelity'],
              },
              {
                name: 'Accessibility Considerations',
                type: 'select',
                options: ['Basic', 'WCAG 2.1 AA', 'WCAG 2.1 AAA'],
              },
              {
                name: 'Interaction Design',
                type: 'checkbox',
                options: null,
              },
            ],
            services: [
              {
                name: 'Comprehensive UX Research & Design',
                image: `https://static.thenounproject.com/png/1874831-200.png`,
                metadata: [
                  {
                    name: 'Project Scope',
                    type: 'select',
                    tags: [
                      'New Product Development',
                      'Existing Product Improvement',
                      'Feature Addition',
                    ],
                  },
                  {
                    name: 'Research Depth',
                    type: 'select',
                    tags: ['Basic', 'Standard', 'In-depth', 'Custom'],
                  },
                  {
                    name: 'Deliverable Format',
                    type: 'multi_select',
                    tags: [
                      'Research Report',
                      'Wireframes',
                      'Interactive Prototype',
                      'Presentation',
                    ],
                  },
                ],
              },
              {
                name: 'UX Audit  & Recommendations',
                image: `https://cdn-icons-png.flaticon.com/512/7522/7522074.png`,
                metadata: [
                  {
                    name: 'Audit Type',
                    type: 'select',
                    tags: [
                      'Heuristic Evaluation',
                      'Cognitive Walkthrough',
                      'Expert Review',
                      'Comprehensive Audit',
                    ],
                  },
                  {
                    name: 'Focus Areas',
                    type: 'multi_select',
                    tags: [
                      'Navigation',
                      'Content Structure',
                      'Interaction Design',
                      'Visual Hierarchy',
                      'Accessibility',
                    ],
                  },
                  {
                    name: 'Recommendation Depth',
                    type: 'select',
                    tags: [
                      'High-level Suggestions',
                      'Detailed Recommendations',
                      'Actionable Redesign Proposals',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        subcategoryGroup: 'Art & Illustration',
        image:
          'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/68011f21cd41c664951df861d9f876ac-1682402649988/Art%20_%20Illustration.png',
        subcategories: [
          {
            name: 'Illustration',
            features: [
              {
                name: 'Style',
                type: 'select',
                options: [
                  'Realistic',
                  'Cartoon',
                  'Anime/Manga',
                  'Vector',
                  'Watercolor',
                  'Digital Painting',
                ],
              },
              {
                name: 'Purpose',
                type: 'select',
                options: [
                  'Book',
                  'Editorial',
                  'Advertising',
                  'Character Design',
                  'Concept Art',
                  'Pattern Design',
                ],
              },
              {
                name: 'Complexity',
                type: 'select',
                options: ['Simple', 'Moderate', 'Complex', 'Highly Detailed'],
              },
              {
                name: 'Color Scheme',
                type: 'select',
                options: [
                  'Black & White',
                  'Monochromatic',
                  'Limited Palette',
                  'Full Color',
                ],
              },
              {
                name: 'File Format',
                type: 'select',
                options: ['JPG', 'PNG', 'SVG', 'AI', 'PSD', 'TIFF'],
              },
              {
                name: 'Commercial Use',
                type: 'select',
                options: [
                  'Personal Use Only',
                  'Commercial Use',
                  'Extended Commercial License',
                ],
              },
            ],
            services: [
              {
                name: 'Custom Illustration',
                image: `https://www.shutterstock.com/image-vector/brush-on-computer-icon-vector-260nw-1692671215.jpg`,
                metadata: [
                  {
                    name: 'Illustration Type',
                    type: 'select',
                    tags: [
                      'Character',
                      'Scene',
                      'Product',
                      'Abstract',
                      'Infographic',
                    ],
                  },
                  {
                    name: 'Revisions',
                    type: 'select',
                    tags: ['1-2', '3-5', 'Unlimited'],
                  },
                  {
                    name: 'Delivery Time',
                    type: 'select',
                    tags: [
                      'Standard (7 days)',
                      'Express (3 days)',
                      'Rush (24 hours)',
                    ],
                  },
                ],
              },
              {
                name: 'Illustration Series',
                image: `https://www.shutterstock.com/image-vector/brush-on-computer-icon-vector-260nw-1692671215.jpg`,
                metadata: [
                  {
                    name: 'Number of Illustrations',
                    type: 'select',
                    tags: ['3-5', '6-10', '11-20', '20+'],
                  },
                  {
                    name: 'Consistency',
                    type: 'select',
                    tags: ['Same Style', 'Varied Styles', 'Progressive Series'],
                  },
                  {
                    name: 'Usage Rights',
                    type: 'select',
                    tags: ['Single Use', 'Multiple Use', 'Unlimited Use'],
                  },
                ],
              },
            ],
          },
          {
            name: 'AI Artists',
            features: [
              {
                name: 'AI Platform',
                type: 'select',
                options: [
                  'DALL-E',
                  'Midjourney',
                  'Stable Diffusion',
                  'Custom AI Model',
                ],
              },
              {
                name: 'Style Transfer',
                type: 'select',
                options: ['None', 'Basic', 'Advanced'],
              },
              {
                name: 'Resolution',
                type: 'select',
                options: ['Standard', 'High', 'Ultra-High'],
              },
              {
                name: 'Number of Generations',
                type: 'select',
                options: ['1-5', '6-20', '21-50', '50+'],
              },
              {
                name: 'Human Refinement',
                type: 'select',
                options: ['None', 'Basic Touch-ups', 'Significant Editing'],
              },
              {
                name: 'Prompt Crafting',
                type: 'select',
                options: ['Basic', 'Advanced', 'Expert-level'],
              },
            ],
            services: [
              {
                name: 'AI-Generated Art',
                image: `https://thumbs.dreamstime.com/b/artificial-intelligence-generated-icon-vector-ai-sign-graphic-design-logo-website-social-media-mobile-app-ui-illustration-277687312.jpg`,
                metadata: [
                  {
                    name: 'Art Style',
                    type: 'select',
                    tags: [
                      'Photorealistic',
                      'Abstract',
                      'Digital Art',
                      'Traditional Media Simulation',
                    ],
                  },
                  {
                    name: 'Customization Level',
                    type: 'select',
                    tags: [
                      'Standard Generation',
                      'Customized Prompts',
                      'Iterative Refinement',
                    ],
                  },
                  {
                    name: 'Output Quantity',
                    type: 'select',
                    tags: [
                      'Single Image',
                      'Image Set (5-10)',
                      'Large Collection (10+)',
                    ],
                  },
                ],
              },
              {
                name: 'AI Art Consultation',
                image: `https://cdn-icons-png.freepik.com/512/6323/6323521.png`,
                metadata: [
                  {
                    name: 'Consultation Type',
                    type: 'select',
                    tags: [
                      'One-time Session',
                      'Ongoing Support',
                      'Project-based',
                    ],
                  },
                  {
                    name: 'Focus Area',
                    type: 'multi_select',
                    tags: [
                      'Prompt Engineering',
                      'AI Tool Selection',
                      'Post-processing Techniques',
                      'Integration with Traditional Art',
                    ],
                  },
                  {
                    name: 'Skill Level',
                    type: 'select',
                    tags: ['Beginner', 'Intermediate', 'Advanced'],
                  },
                ],
              },
            ],
          },
          {
            name: "Children's Book Illustration",
            features: [
              {
                name: 'Illustration Style',
                type: 'select',
                options: [
                  'Whimsical',
                  'Realistic',
                  'Cartoon',
                  'Educational',
                  'Fantasy',
                ],
              },
              {
                name: 'Age Group',
                type: 'select',
                options: [
                  '0-3 years',
                  '4-8 years',
                  '9-12 years',
                  'Young Adult',
                ],
              },
              {
                name: 'Number of Illustrations',
                type: 'select',
                options: ['1-5', '6-15', '16-30', '30+'],
              },
              {
                name: 'Color Palette',
                type: 'select',
                options: ['Vibrant', 'Pastel', 'Monochromatic', 'Custom'],
              },
              {
                name: 'Character Design',
                type: 'select',
                options: ['Human', 'Animal', 'Fantasy Creatures', 'Mixed'],
              },
              {
                name: 'Background Complexity',
                type: 'select',
                options: ['Simple', 'Detailed', 'Variable'],
              },
            ],
            services: [
              {
                name: 'Full Book Illustration Package',
                image: `https://i.pinimg.com/736x/51/06/06/510606fef484fcbe346572557b4b8bb7.jpg`,
                metadata: [
                  {
                    name: 'Book Length',
                    type: 'select',
                    tags: [
                      'Short Story (10-20 pages)',
                      'Standard (24-32 pages)',
                      'Chapter Book (40+ pages)',
                    ],
                  },
                  {
                    name: 'Cover Design',
                    type: 'select',
                    tags: ['Included', 'Not Included', 'Separate Service'],
                  },
                  {
                    name: 'Storyboard Development',
                    type: 'select',
                    tags: ['Basic', 'Detailed', 'Collaborative Process'],
                  },
                ],
              },
              {
                name: 'Character Development',
                image: `https://cdn-icons-png.flaticon.com/512/5341/5341063.png`,
                metadata: [
                  {
                    name: 'Number of Characters',
                    type: 'select',
                    tags: ['1-2', '3-5', '6+'],
                  },
                  {
                    name: 'Expression Sheets',
                    type: 'select',
                    tags: ['Basic', 'Comprehensive', 'Not Included'],
                  },
                  {
                    name: 'Turnaround Views',
                    type: 'select',
                    tags: ['Front Only', 'Front and Side', 'Full 360°'],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        subcategoryGroup: 'Architecture & Building Design',
        image:
          'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/68011f21cd41c664951df861d9f876ac-1682402649984/Architecture%20_%20Building%E2%80%A8Design.png',
        subcategories: [
          {
            name: 'Architecture & Interior Design',
            features: [
              {
                name: 'Design Type',
                type: 'select',
                options: [
                  'Residential',
                  'Commercial',
                  'Industrial',
                  'Landscape',
                ],
              },
              {
                name: 'Service Scope',
                type: 'select',
                options: [
                  'Concept Design',
                  'Schematic Design',
                  'Design Development',
                  'Construction Documents',
                ],
              },
              {
                name: 'Rendering Type',
                type: 'select',
                options: [
                  '2D Floor Plans',
                  '3D Exterior',
                  '3D Interior',
                  'Virtual Tour',
                ],
              },
              {
                name: 'Sustainability Features',
                type: 'select',
                options: [
                  'Energy Efficiency',
                  'Water Conservation',
                  'Sustainable Materials',
                  'Green Certification',
                ],
              },
              {
                name: 'Style',
                type: 'select',
                options: [
                  'Modern',
                  'Traditional',
                  'Minimalist',
                  'Industrial',
                  'Scandinavian',
                  'Custom',
                ],
              },
              {
                name: 'Revisions',
                type: 'select',
                options: ['1-2', '3-5', 'Unlimited'],
              },
            ],
            services: [
              {
                name: 'Custom Architectural Design',
                image: `https://www.clipartmax.com/png/middle/97-979191_architects-icon.png`,
                metadata: [
                  {
                    name: 'Project Scale',
                    type: 'select',
                    tags: [
                      'Small (< 1000 sq ft)',
                      'Medium (1000-5000 sq ft)',
                      'Large (> 5000 sq ft)',
                    ],
                  },
                  {
                    name: 'Design Phases',
                    type: 'multi_select',
                    tags: [
                      'Conceptual Design',
                      'Schematic Design',
                      'Design Development',
                      'Construction Documents',
                    ],
                  },
                  {
                    name: 'Consultation Hours',
                    type: 'select',
                    tags: [
                      'Up to 5 hours',
                      '6-10 hours',
                      '11-20 hours',
                      '20+ hours',
                    ],
                  },
                ],
              },
              {
                name: 'Interior Design Package',
                image: `https://www.clipartmax.com/png/middle/231-2313842_interior-design-assistance-interior-designer-icon-png.png`,
                metadata: [
                  {
                    name: 'Room Count',
                    type: 'select',
                    tags: [
                      'Single Room',
                      '2-3 Rooms',
                      'Whole House/Apartment',
                      'Commercial Space',
                    ],
                  },
                  {
                    name: 'Design Elements',
                    type: 'multi_select',
                    tags: [
                      'Space Planning',
                      'Color Scheme',
                      'Furniture Selection',
                      'Lighting Design',
                      'Material Selection',
                    ],
                  },
                  {
                    name: 'Presentation Format',
                    type: 'multi_select',
                    tags: [
                      'Mood Board',
                      '2D Renderings',
                      '3D Visualizations',
                      'Material Samples',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Landscape Design',
            features: [
              {
                name: 'Area Size',
                type: 'select',
                options: [
                  'Small (< 1000 sq ft)',
                  'Medium (1000-5000 sq ft)',
                  'Large (> 5000 sq ft)',
                ],
              },
              {
                name: 'Design Elements',
                type: 'select',
                options: [
                  'Planting Plan',
                  'Hardscaping',
                  'Water Features',
                  'Lighting',
                  'Outdoor Structures',
                ],
              },
              {
                name: 'Style',
                type: 'select',
                options: [
                  'Modern',
                  'Traditional',
                  'Xeriscape',
                  'Japanese',
                  'English Garden',
                  'Mediterranean',
                ],
              },
              {
                name: 'Sustainability',
                type: 'select',
                options: [
                  'Native Plants',
                  'Water Conservation',
                  'Permeable Surfaces',
                  'Composting Areas',
                ],
              },
              {
                name: 'Maintenance Level',
                type: 'select',
                options: ['Low', 'Medium', 'High'],
              },
              {
                name: 'Visualization',
                type: 'select',
                options: ['2D Plan', '3D Rendering', 'Virtual Walkthrough'],
              },
            ],
            services: [
              {
                name: 'Custom Landscape Design',
                image: `https://c8.alamy.com/comp/2F4HNKN/landscape-design-black-line-icon-pictogram-for-web-page-mobile-app-promo-editable-stroke-2F4HNKN.jpg`,
                metadata: [
                  {
                    name: 'Design Complexity',
                    type: 'select',
                    tags: ['Basic', 'Intermediate', 'Complex', 'Master Plan'],
                  },
                  {
                    name: 'Climate Consideration',
                    type: 'select',
                    tags: [
                      'Tropical',
                      'Arid',
                      'Temperate',
                      'Mediterranean',
                      'Custom',
                    ],
                  },
                  {
                    name: 'Functionality Focus',
                    type: 'multi_select',
                    tags: [
                      'Aesthetic',
                      'Recreational',
                      'Edible Garden',
                      'Wildlife Friendly',
                      'Water Management',
                    ],
                  },
                ],
              },
              {
                name: 'Landscape Renovation Consultation',
                image: `https://cdn3.vectorstock.com/i/1000x1000/43/92/landscape-design-icon-line-symbol-premium-quality-vector-23864392.jpg`,
                metadata: [
                  {
                    name: 'Consultation Type',
                    type: 'select',
                    tags: [
                      'On-site Visit',
                      'Virtual Consultation',
                      'Written Report',
                    ],
                  },
                  {
                    name: 'Assessment Areas',
                    type: 'multi_select',
                    tags: [
                      'Plant Health',
                      'Irrigation Efficiency',
                      'Soil Quality',
                      'Hardscape Condition',
                    ],
                  },
                  {
                    name: 'Recommendation Scope',
                    type: 'select',
                    tags: [
                      'Quick Fixes',
                      'Phased Improvements',
                      'Complete Overhaul',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Building Information Modeling (BIM)',
            features: [
              {
                name: 'BIM Software',
                type: 'select',
                options: [
                  'Revit',
                  'ArchiCAD',
                  'Vectorworks',
                  'Tekla Structures',
                  'Navisworks',
                ],
              },
              {
                name: 'LOD (Level of Development)',
                type: 'select',
                options: [
                  'LOD 100',
                  'LOD 200',
                  'LOD 300',
                  'LOD 400',
                  'LOD 500',
                ],
              },
              {
                name: 'Model Components',
                type: 'select',
                options: [
                  'Architectural',
                  'Structural',
                  'MEP',
                  'Civil',
                  'Landscape',
                ],
              },
              {
                name: 'Collaboration Features',
                type: 'select',
                options: [
                  'Cloud Sharing',
                  'Version Control',
                  'Clash Detection',
                  'Coordination Meetings',
                ],
              },
              {
                name: '4D/5D Capabilities',
                type: 'select',
                options: ['Not Included', '4D (Time)', '5D (Cost)'],
              },
              {
                name: 'Deliverables',
                type: 'select',
                options: [
                  '3D Model',
                  '2D Drawings',
                  'Schedules',
                  'Quantity Takeoffs',
                  'Clash Reports',
                ],
              },
            ],
            services: [
              {
                name: 'Full BIM Project Modeling',
                image: `https://www.shutterstock.com/image-vector/building-information-modeling-icon-development-600nw-1904338924.jpg`,
                metadata: [
                  {
                    name: 'Project Scale',
                    type: 'select',
                    tags: [
                      'Small Building',
                      'Medium Complex',
                      'Large Facility',
                      'Infrastructure',
                    ],
                  },
                  {
                    name: 'Model Usage',
                    type: 'multi_select',
                    tags: [
                      'Design Coordination',
                      'Construction Planning',
                      'Facility Management',
                      'Energy Analysis',
                    ],
                  },
                  {
                    name: 'Integration Level',
                    type: 'select',
                    tags: [
                      'Single Discipline',
                      'Multi-Discipline',
                      'Fully Integrated',
                    ],
                  },
                ],
              },
              {
                name: 'BIM Consultation and Training',
                image: `https://vigilantconsultants.com/wp-content/uploads/2022/07/Vigilant-brochure-icons-BIM.png`,
                metadata: [
                  {
                    name: 'Consultation Focus',
                    type: 'select',
                    tags: [
                      'BIM Implementation Strategy',
                      'Workflow Optimization',
                      'Software Selection',
                      'Custom',
                    ],
                  },
                  {
                    name: 'Training Type',
                    type: 'select',
                    tags: [
                      'Basic Software Skills',
                      'Advanced Modeling',
                      'Collaboration Workflows',
                      'Custom Curriculum',
                    ],
                  },
                  {
                    name: 'Delivery Method',
                    type: 'select',
                    tags: [
                      'On-site',
                      'Remote Live Sessions',
                      'Self-paced Online Course',
                      'Hybrid',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Music & Audio',
    image:
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/509f310d48d17eafe768a87f78d10af8-1688626492933/M_A-%20Desktop%20banner.png',
    subcategoryGroups: [
      {
        subcategoryGroup: 'Music Production & Writing',
        image:
          'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/4a3e5be4c3444c820c64bf49d9b5769b-1681898874126/Music%20Production%20_%20Writing.jpg',
        subcategories: [
          {
            name: 'Music Producers',
            features: [
              {
                name: 'Genre Expertise',
                type: 'select',
                options: [
                  'Pop',
                  'Rock',
                  'Hip Hop',
                  'Electronic',
                  'R&B',
                  'Country',
                  'Jazz',
                  'Classical',
                ],
              },
              {
                name: 'Production Software',
                type: 'select',
                options: [
                  'Pro Tools',
                  'Logic Pro',
                  'Ableton Live',
                  'FL Studio',
                  'Cubase',
                  'Studio One',
                ],
              },
              {
                name: 'Services Offered',
                type: 'select',
                options: [
                  'Arrangement',
                  'Mixing',
                  'Mastering',
                  'Sound Design',
                  'Recording',
                  'Session Musicians Coordination',
                ],
              },
              {
                name: 'Project Type',
                type: 'select',
                options: [
                  'Single Track',
                  'EP',
                  'Full Album',
                  'Remix',
                  'Film/TV Score',
                ],
              },
              {
                name: 'Delivery Time',
                type: 'select',
                options: [
                  '24 hours',
                  '3 days',
                  '7 days',
                  '14 days',
                  '30 days',
                  'Custom',
                ],
              },
              {
                name: 'Revisions',
                type: 'select',
                options: ['1', '2', '3', 'Unlimited'],
              },
            ],
            services: [
              {
                name: 'Full Track Production',
                image: `https://cdn-icons-png.flaticon.com/512/3712/3712210.png`,
                metadata: [
                  {
                    name: 'Track Length',
                    type: 'select',
                    tags: ['1-3 minutes', '3-5 minutes', '5+ minutes'],
                  },
                  {
                    name: 'Instruments Included',
                    type: 'multi_select',
                    tags: [
                      'Drums',
                      'Bass',
                      'Guitar',
                      'Keys',
                      'Strings',
                      'Brass',
                      'Woodwinds',
                    ],
                  },
                  {
                    name: 'Vocal Production',
                    type: 'select',
                    tags: ['Not Included', 'Basic', 'Advanced'],
                  },
                ],
              },
              {
                name: 'Beat Making',
                image: `https://www.shutterstock.com/image-vector/brown-launch-pad-outline-icon-260nw-2352662541.jpg`,
                metadata: [
                  {
                    name: 'Beat Style',
                    type: 'select',
                    tags: ['Trap', 'Boom Bap', 'Lo-Fi', 'Pop', 'R&B', 'Custom'],
                  },
                  {
                    name: 'Stem Delivery',
                    type: 'select',
                    tags: ['Full Beat Only', 'Basic Stems', 'Full Stem-Out'],
                  },
                  {
                    name: 'Usage Rights',
                    type: 'select',
                    tags: ['Lease', 'Exclusive Rights', 'Work for Hire'],
                  },
                ],
              },
            ],
          },
          {
            name: 'Composers',
            features: [
              {
                name: 'Composition Style',
                type: 'select',
                options: [
                  'Orchestral',
                  'Electronic',
                  'Minimalist',
                  'Jazz',
                  'World Music',
                  'Avant-garde',
                ],
              },
              {
                name: 'Instrumentation',
                type: 'select',
                options: [
                  'Full Orchestra',
                  'Chamber Ensemble',
                  'Solo Instrument',
                  'Electronic',
                  'Hybrid',
                ],
              },
              {
                name: 'Notation Software',
                type: 'select',
                options: [
                  'Sibelius',
                  'Finale',
                  'MuseScore',
                  'Dorico',
                  'Notion',
                ],
              },
              {
                name: 'Delivery Format',
                type: 'select',
                options: ['PDF', 'MIDI', 'Audio Mockup', 'Stems'],
              },
              {
                name: 'Project Length',
                type: 'select',
                options: [
                  'Short (1-3 min)',
                  'Medium (3-10 min)',
                  'Long (10+ min)',
                  'Full Score',
                ],
              },
              {
                name: 'Sync Licensing',
                type: 'select',
                options: ['Included', 'Not Included', 'Additional Cost'],
              },
            ],
            services: [
              {
                name: 'Custom Composition',
                image: `https://cdn-icons-png.flaticon.com/512/26/26297.png`,
                metadata: [
                  {
                    name: 'Purpose',
                    type: 'select',
                    tags: [
                      'Film/TV',
                      'Video Games',
                      'Advertising',
                      'Concert Performance',
                      'Personal',
                    ],
                  },
                  {
                    name: 'Complexity',
                    type: 'select',
                    tags: ['Simple', 'Moderate', 'Complex', 'Virtuosic'],
                  },
                  {
                    name: 'Revisions',
                    type: 'select',
                    tags: ['1 Round', '2 Rounds', '3 Rounds', 'Unlimited'],
                  },
                ],
              },
              {
                name: 'Orchestration Services',
                image: `https://w7.pngwing.com/pngs/400/751/png-transparent-automation-computer-icons-workflow-graphics-orchestration-skills-icon-business-business-process-auto-part-thumbnail.png`,
                metadata: [
                  {
                    name: 'Ensemble Size',
                    type: 'select',
                    tags: [
                      'Small Ensemble (2-10 players)',
                      'Chamber Orchestra (10-40 players)',
                      'Full Orchestra (40+ players)',
                    ],
                  },
                  {
                    name: 'Score Preparation',
                    type: 'multi_select',
                    tags: [
                      'Full Score',
                      'Individual Parts',
                      'Transposed Parts',
                      "Conductor's Score",
                    ],
                  },
                  {
                    name: 'Additional Services',
                    type: 'multi_select',
                    tags: [
                      'MIDI Mockup',
                      'Score Reduction',
                      'Arrangement',
                      'Engraving',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Songwriters',
            features: [
              {
                name: 'Genre Specialization',
                type: 'select',
                options: [
                  'Pop',
                  'Rock',
                  'Country',
                  'R&B',
                  'Hip Hop',
                  'EDM',
                  'Folk',
                  'Musical Theater',
                ],
              },
              {
                name: 'Services Offered',
                type: 'select',
                options: [
                  'Lyrics Writing',
                  'Melody Writing',
                  'Co-writing',
                  'Topline Writing',
                  'Full Song',
                ],
              },
              {
                name: 'Collaboration Method',
                type: 'select',
                options: ['Remote', 'In-person', 'Both'],
              },
              {
                name: 'Copyright Handling',
                type: 'select',
                options: [
                  'Split Sheet Provided',
                  'Full Rights Transfer',
                  'Licensing Agreement',
                ],
              },
              {
                name: 'Delivery Format',
                type: 'select',
                options: [
                  'Lyrics Document',
                  'Rough Demo',
                  'Produced Demo',
                  'Lead Sheet',
                ],
              },
              {
                name: 'Turnaround Time',
                type: 'select',
                options: ['24 hours', '3 days', '7 days', '14 days', 'Custom'],
              },
            ],
            services: [
              {
                name: 'Custom Song Writing',
                image: `https://cdn-icons-png.flaticon.com/512/1096/1096044.png`,
                metadata: [
                  {
                    name: 'Song Structure',
                    type: 'select',
                    tags: [
                      'Verse-Chorus',
                      'AABA',
                      'Through-Composed',
                      'Custom',
                    ],
                  },
                  {
                    name: 'Topic/Theme',
                    type: 'select',
                    tags: [
                      'Love',
                      'Breakup',
                      'Social Issues',
                      'Party',
                      'Inspirational',
                      'Custom',
                    ],
                  },
                  {
                    name: 'Additional Elements',
                    type: 'multi_select',
                    tags: [
                      'Hook Creation',
                      'Bridge Writing',
                      'Pre-Chorus',
                      'Backing Vocals Arrangement',
                    ],
                  },
                ],
              },
              {
                name: 'Lyric Writing',
                image: `https://cdn-icons-png.flaticon.com/512/3226/3226801.png`,
                metadata: [
                  {
                    name: 'Lyric Style',
                    type: 'select',
                    tags: ['Narrative', 'Abstract', 'Conversational', 'Poetic'],
                  },
                  {
                    name: 'Language',
                    type: 'select',
                    tags: [
                      'English',
                      'Spanish',
                      'French',
                      'Multiple Languages',
                      'Other',
                    ],
                  },
                  {
                    name: 'Rhyme Scheme',
                    type: 'select',
                    tags: ['Simple', 'Complex', 'Free Verse', 'Custom'],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        subcategoryGroup: 'Audio Engineering & Post Production',
        image:
          'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/54b8566acee6fb3d6a492b11cd828825-1682588022028/Audio%20Engineering%20_%20Post-production.png',
        subcategories: [
          {
            name: 'Mixing & Mastering',
            features: [
              {
                name: 'Service Type',
                type: 'select',
                options: [
                  'Mixing Only',
                  'Mastering Only',
                  'Mixing & Mastering',
                ],
              },
              {
                name: 'Genre Expertise',
                type: 'select',
                options: [
                  'Pop',
                  'Rock',
                  'Hip Hop',
                  'EDM',
                  'Jazz',
                  'Classical',
                  'Country',
                ],
              },
              {
                name: 'Delivery Format',
                type: 'select',
                options: ['WAV', 'MP3', 'FLAC', 'Stems'],
              },
              {
                name: 'Revisions',
                type: 'select',
                options: ['1', '2', '3', 'Unlimited'],
              },
              {
                name: 'Turnaround Time',
                type: 'select',
                options: ['24 hours', '3 days', '7 days', '14 days', 'Custom'],
              },
              {
                name: 'Additional Services',
                type: 'select',
                options: [
                  'Vocal Tuning',
                  'Drum Replacement',
                  'Stem Mixing',
                  'Analog Processing',
                ],
              },
            ],
            services: [
              {
                name: 'Professional Mixing',
                image: `https://cdn-icons-png.flaticon.com/512/113/113207.png`,
                metadata: [
                  {
                    name: 'Track Count',
                    type: 'select',
                    tags: [
                      'Up to 16 tracks',
                      '17-32 tracks',
                      '33-64 tracks',
                      '65+ tracks',
                    ],
                  },
                  {
                    name: 'Mix Complexity',
                    type: 'select',
                    tags: ['Basic', 'Standard', 'Complex', 'Premium'],
                  },
                  {
                    name: 'Reference Tracks',
                    type: 'select',
                    tags: [
                      'Not Required',
                      '1 Reference',
                      'Multiple References',
                    ],
                  },
                ],
              },
              {
                name: 'Mastering for Streaming',
                image: `https://thumbs.dreamstime.com/b/streaming-icon-music-327640882.jpg`,
                metadata: [
                  {
                    name: 'Streaming Platforms',
                    type: 'multi_select',
                    tags: [
                      'Spotify',
                      'Apple Music',
                      'Amazon Music',
                      'YouTube',
                      'SoundCloud',
                    ],
                  },
                  {
                    name: 'Loudness Standard',
                    type: 'select',
                    tags: [
                      'Spotify (-14 LUFS)',
                      'AES Streaming (-16 LUFS)',
                      'Custom Target',
                    ],
                  },
                  {
                    name: 'Mastering Style',
                    type: 'select',
                    tags: [
                      'Transparent',
                      'Colored/Vintage',
                      'Modern/Loud',
                      'Custom',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Audio Editing',
            features: [
              {
                name: 'Edit Type',
                type: 'select',
                options: [
                  'Timing Correction',
                  'Pitch Correction',
                  'Noise Reduction',
                  'Dialogue Editing',
                  'Podcast Editing',
                ],
              },
              {
                name: 'Software Used',
                type: 'select',
                options: [
                  'Pro Tools',
                  'Logic Pro',
                  'Adobe Audition',
                  'Audacity',
                  'iZotope RX',
                ],
              },
              {
                name: 'Audio Source',
                type: 'select',
                options: [
                  'Studio Recording',
                  'Live Recording',
                  'Field Recording',
                  'Voice Over',
                  'Podcast',
                ],
              },
              {
                name: 'Delivery Format',
                type: 'select',
                options: ['WAV', 'MP3', 'AIFF', 'Multitrack Session'],
              },
              {
                name: 'Turnaround Time',
                type: 'select',
                options: ['24 hours', '2-3 days', '4-7 days', 'Custom'],
              },
              {
                name: 'Additional Services',
                type: 'select',
                options: ['Transcription', 'Sound Design', 'Foley', 'ADR'],
              },
            ],
            services: [
              {
                name: 'Podcast Episode Editing',
                image: `https://e7.pngegg.com/pngimages/340/477/png-clipart-video-editing-symbol-computer-icons-trim-miscellaneous-text.png`,
                metadata: [
                  {
                    name: 'Episode Length',
                    type: 'select',
                    tags: [
                      'Up to 30 minutes',
                      '30-60 minutes',
                      '60-90 minutes',
                      '90+ minutes',
                    ],
                  },
                  {
                    name: 'Edit Complexity',
                    type: 'select',
                    tags: [
                      'Basic Clean-up',
                      'Standard Edit',
                      'Full Production',
                    ],
                  },
                  {
                    name: 'Additional Elements',
                    type: 'multi_select',
                    tags: [
                      'Intro/Outro',
                      'Music Beds',
                      'Sound Effects',
                      'Ad Insertion',
                    ],
                  },
                ],
              },
              {
                name: 'Dialogue Editing for Film/TV',
                image: `https://cdn1.iconfinder.com/data/icons/film-making-outline/60/Edit-Film-Strip-Movies-tv-editing-512.png`,
                metadata: [
                  {
                    name: 'Project Length',
                    type: 'select',
                    tags: [
                      'Short Film (up to 40 min)',
                      'Feature Film',
                      'TV Episode',
                      'Series',
                    ],
                  },
                  {
                    name: 'Services Included',
                    type: 'multi_select',
                    tags: [
                      'Dialogue Clean-up',
                      'ADR Integration',
                      'Ambience Matching',
                      'Lip Sync Adjustment',
                    ],
                  },
                  {
                    name: 'Delivery Format',
                    type: 'select',
                    tags: ['OMF/AAF', 'Pro Tools Session', 'Stems'],
                  },
                ],
              },
            ],
          },
          {
            name: 'Vocal Tuning',
            features: [
              {
                name: 'Tuning Software',
                type: 'select',
                options: [
                  'Melodyne',
                  'Auto-Tune',
                  'Waves Tune',
                  'Logic Flex Pitch',
                  'Custom',
                ],
              },
              {
                name: 'Tuning Style',
                type: 'select',
                options: ['Natural', 'Subtle', 'Moderate', 'Extreme/Effect'],
              },
              {
                name: 'Genre',
                type: 'select',
                options: ['Pop', 'R&B', 'Country', 'Rock', 'Hip Hop', 'EDM'],
              },
              {
                name: 'Additional Processing',
                type: 'select',
                options: [
                  'Timing Correction',
                  'Breath Removal',
                  'De-essing',
                  'Compression',
                  'EQ',
                ],
              },
              {
                name: 'Delivery Format',
                type: 'select',
                options: ['WAV', 'MP3', 'Tuned Session File'],
              },
              {
                name: 'Turnaround Time',
                type: 'select',
                options: ['24 hours', '2-3 days', '4-7 days', 'Custom'],
              },
            ],
            services: [
              {
                name: 'Professional Vocal Tuning',
                image: `https://twinstudiosparis.com/wp-content/uploads/2022/01/tuning-vocal-lead.png`,
                metadata: [
                  {
                    name: 'Track Count',
                    type: 'select',
                    tags: [
                      'Single Vocal',
                      'Lead + Backing',
                      'Full Vocal Production',
                    ],
                  },
                  {
                    name: 'Tuning Intensity',
                    type: 'select',
                    tags: [
                      'Light Touch-up',
                      'Moderate Correction',
                      'Heavy Correction',
                      'Creative Effect',
                    ],
                  },
                  {
                    name: 'Reference Track',
                    type: 'select',
                    tags: [
                      'Not Required',
                      'Provided by Client',
                      'Suggested by Producer',
                    ],
                  },
                ],
              },
              {
                name: 'Vocal Comping & Tuning',
                image: `https://c8.alamy.com/comp/2DXJYXW/tuning-fork-vector-flat-icon-music-sign-graph-symbol-for-music-and-sound-web-site-and-apps-design-logo-app-ui-2DXJYXW.jpg`,
                metadata: [
                  {
                    name: 'Number of Takes',
                    type: 'select',
                    tags: [
                      '1-5 takes',
                      '6-10 takes',
                      '11-20 takes',
                      '20+ takes',
                    ],
                  },
                  {
                    name: 'Comping Style',
                    type: 'select',
                    tags: [
                      'Best Performance',
                      'Syllable-by-Syllable',
                      'Creative Reinterpretation',
                    ],
                  },
                  {
                    name: 'Additional Editing',
                    type: 'select',
                    tags: [
                      'Timing Adjustment',
                      'Formant Correction',
                      'Vibrato Modification',
                      'Pitch Shifting',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        subcategoryGroup: 'Voice Over & Streaming',
        image:
          'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/4a3e5be4c3444c820c64bf49d9b5769b-1681898874112/Voice%20Over%20_%20Streaming.jpg',
        subcategories: [
          {
            name: 'Voice Over',
            features: [
              {
                name: 'Voice Type',
                type: 'select',
                options: [
                  'Male',
                  'Female',
                  'Child',
                  'Senior',
                  'Character Voice',
                ],
              },
              {
                name: 'Language',
                type: 'select',
                options: [
                  'English',
                  'Spanish',
                  'French',
                  'German',
                  'Mandarin',
                  'Japanese',
                  'Other',
                ],
              },
              {
                name: 'Accent',
                type: 'select',
                options: [
                  'American',
                  'British',
                  'Australian',
                  'Regional Accent',
                  'Neutral',
                ],
              },
              {
                name: 'Project Type',
                type: 'select',
                options: [
                  'Commercial',
                  'Narration',
                  'E-Learning',
                  'IVR/Phone System',
                  'Character/Animation',
                ],
              },
              {
                name: 'Recording Quality',
                type: 'select',
                options: [
                  'Home Studio',
                  'Professional Studio',
                  'ISDN/Source Connect',
                ],
              },
              {
                name: 'Turnaround Time',
                type: 'select',
                options: ['24 hours', '48 hours', '3-5 days', 'Custom'],
              },
            ],
            services: [
              {
                name: 'Commercial Voice Over',
                image: `https://cdn-icons-png.flaticon.com/512/58/58693.png`,
                metadata: [
                  {
                    name: 'Script Length',
                    type: 'select',
                    tags: [
                      'Up to 50 words',
                      '51-150 words',
                      '151-300 words',
                      '300+ words',
                    ],
                  },
                  {
                    name: 'Usage Rights',
                    type: 'select',
                    tags: [
                      'Local',
                      'Regional',
                      'National',
                      'International',
                      'Internet Only',
                    ],
                  },
                  {
                    name: 'Delivery Format',
                    type: 'multi_select',
                    tags: ['WAV', 'MP3', 'AIFF', 'Raw/Edited'],
                  },
                ],
              },
              {
                name: 'Audiobook Narration',
                image: `https://www.shutterstock.com/image-illustration/audiobooks-illustration-black-white-cut-600nw-2064893300.jpg`,
                metadata: [
                  {
                    name: 'Book Length',
                    type: 'select',
                    tags: [
                      'Short Story (up to 1 hour)',
                      'Novella (1-3 hours)',
                      'Novel (3-10 hours)',
                      'Long Novel (10+ hours)',
                    ],
                  },
                  {
                    name: 'Narration Style',
                    type: 'select',
                    tags: [
                      'Single Narrator',
                      'Multi-character Performance',
                      'Duet Narration',
                    ],
                  },
                  {
                    name: 'Post-Production',
                    type: 'select',
                    tags: [
                      'Raw Audio',
                      'Edited',
                      'Fully Produced (with music/SFX)',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Podcast Production',
            features: [
              {
                name: 'Production Level',
                type: 'select',
                options: ['Basic', 'Standard', 'Premium', 'Full Service'],
              },
              {
                name: 'Episode Length',
                type: 'select',
                options: [
                  '15-30 minutes',
                  '31-60 minutes',
                  '61-90 minutes',
                  '90+ minutes',
                ],
              },
              {
                name: 'Frequency',
                type: 'select',
                options: ['Weekly', 'Bi-weekly', 'Monthly', 'Custom'],
              },
              {
                name: 'Services Included',
                type: 'select',
                options: [
                  'Editing',
                  'Mixing',
                  'Sound Design',
                  'Music',
                  'Show Notes',
                  'Transcription',
                ],
              },
              {
                name: 'Distribution',
                type: 'select',
                options: [
                  'Apple Podcasts',
                  'Spotify',
                  'Google Podcasts',
                  'Stitcher',
                  'Custom RSS',
                ],
              },
              {
                name: 'Additional Features',
                type: 'select',
                options: [
                  'Intro/Outro Creation',
                  'Ad Insertion',
                  'Audiogram Creation',
                  'Cover Art Design',
                ],
              },
            ],
            services: [
              {
                name: 'Full Podcast Production',
                image: `https://png.pngtree.com/png-clipart/20191123/original/pngtree-podcast-line-icon-vector-png-image_5199535.jpg`,
                metadata: [
                  {
                    name: 'Recording Method',
                    type: 'select',
                    tags: [
                      'Remote Recording',
                      'In-Studio',
                      'On-Location',
                      'Mix of Methods',
                    ],
                  },
                  {
                    name: 'Edit Style',
                    type: 'select',
                    tags: [
                      'Minimal Edit',
                      'Standard Clean-up',
                      'Heavy Edit/Restructure',
                    ],
                  },
                  {
                    name: 'Additional Content',
                    type: 'multi_select',
                    tags: [
                      'Show Notes',
                      'Transcription',
                      'Social Media Clips',
                      'Newsletter Content',
                    ],
                  },
                ],
              },
              {
                name: 'Podcast Launch Package',
                image: `https://thumbs.dreamstime.com/b/podcast-icon-white-background-stamp-logo-stock-vector-illustration-163340574.jpg`,
                metadata: [
                  {
                    name: 'Number of Episodes',
                    type: 'select',
                    tags: [
                      'Trailer + 1 Episode',
                      'Trailer + 3 Episodes',
                      'Trailer + 5 Episodes',
                      'Custom Package',
                    ],
                  },
                  {
                    name: 'Branding Elements',
                    type: 'multi_select',
                    tags: [
                      'Logo Design',
                      'Cover Art',
                      'Intro/Outro Music',
                      'Sound Design Package',
                    ],
                  },
                  {
                    name: 'Launch Strategy',
                    type: 'select',
                    tags: [
                      'Basic (Distribution Only)',
                      'Standard (incl. Social Media)',
                      'Premium (Full Marketing Plan)',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Audio Ads Production',
            features: [
              {
                name: 'Ad Length',
                type: 'select',
                options: ['15 seconds', '30 seconds', '60 seconds', 'Custom'],
              },
              {
                name: 'Voice Talent',
                type: 'select',
                options: [
                  'Single Voice',
                  'Multiple Voices',
                  'Celebrity Voice (Additional Cost)',
                  'Client-Provided',
                ],
              },
              {
                name: 'Music',
                type: 'select',
                options: [
                  'Stock Music',
                  'Custom Composition',
                  'Client-Provided',
                  'No Music',
                ],
              },
              {
                name: 'Sound Effects',
                type: 'select',
                options: ['Basic', 'Advanced', 'Custom Foley', 'None'],
              },
              {
                name: 'Script Writing',
                type: 'select',
                options: ['Included', 'Client-Provided', 'Collaborative'],
              },
              {
                name: 'Usage Rights',
                type: 'select',
                options: [
                  'Local',
                  'Regional',
                  'National',
                  'Internet Only',
                  'Worldwide',
                ],
              },
            ],
            services: [
              {
                name: 'Radio Commercial Production',
                image: `https://cdn2.iconfinder.com/data/icons/marketing-outline-14/60/Radio-Ads-promotion-advertising-audio-512.png`,
                metadata: [
                  {
                    name: 'Production Quality',
                    type: 'select',
                    tags: ['Basic', 'Standard', 'Premium', 'Broadcast Ready'],
                  },
                  {
                    name: 'Revisions',
                    type: 'select',
                    tags: ['1 Round', '2 Rounds', '3 Rounds', 'Unlimited'],
                  },
                  {
                    name: 'Delivery Formats',
                    type: 'multi_select',
                    tags: ['MP3', 'WAV', 'AIFF', 'Broadcast WAV'],
                  },
                ],
              },
              {
                name: 'Podcast Ad Creation',
                image: `https://cdn-icons-png.flaticon.com/512/16262/16262054.png`,
                metadata: [
                  {
                    name: 'Ad Type',
                    type: 'select',
                    tags: [
                      'Host-read',
                      'Pre-produced',
                      'Dynamic Insertion Ready',
                    ],
                  },
                  {
                    name: 'Integration Style',
                    type: 'select',
                    tags: [
                      'Pre-roll',
                      'Mid-roll',
                      'Post-roll',
                      'Native Integration',
                    ],
                  },
                  {
                    name: 'Targeting',
                    type: 'multi_select',
                    tags: [
                      'Demographic',
                      'Geographic',
                      'Interest-based',
                      'Custom',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        subcategoryGroup: 'Lessons & Transcription',
        image:
          'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/4a3e5be4c3444c820c64bf49d9b5769b-1681898874117/Lessons%20_%20Transcription.jpg',
        subcategories: [
          {
            name: 'Online Music Lessons',
            features: [
              {
                name: 'Instrument',
                type: 'select',
                options: [
                  'Guitar',
                  'Piano',
                  'Drums',
                  'Voice',
                  'Bass',
                  'Violin',
                  'Saxophone',
                  'Other',
                ],
              },
              {
                name: 'Skill Level',
                type: 'select',
                options: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
              },
              {
                name: 'Lesson Duration',
                type: 'select',
                options: ['30 minutes', '45 minutes', '60 minutes', 'Custom'],
              },
              {
                name: 'Lesson Frequency',
                type: 'select',
                options: [
                  'One-time',
                  'Weekly',
                  'Bi-weekly',
                  'Monthly',
                  'Custom Schedule',
                ],
              },
              {
                name: 'Teaching Method',
                type: 'select',
                options: [
                  'Traditional',
                  'Suzuki',
                  'Kodály',
                  'Orff',
                  'Dalcroze',
                  'Custom Approach',
                ],
              },
              {
                name: 'Additional Materials',
                type: 'select',
                options: [
                  'Sheet Music',
                  'Backing Tracks',
                  'Video Tutorials',
                  'Practice Exercises',
                  'Theory Worksheets',
                ],
              },
            ],
            services: [
              {
                name: 'Private Online Instrument Lessons',
                image: `https://img.freepik.com/free-vector/online-music-lessons-abstract-concept-illustration-live-video-conferencing-music-teacher-covid-quarantine-online-private-practice-professional-advice_335657-3480.jpg`,
                metadata: [
                  {
                    name: 'Lesson Package',
                    type: 'select',
                    tags: [
                      'Single Lesson',
                      '4-Lesson Package',
                      '8-Lesson Package',
                      '12-Lesson Package',
                    ],
                  },
                  {
                    name: 'Focus Area',
                    type: 'multi_select',
                    tags: [
                      'Technique',
                      'Repertoire',
                      'Improvisation',
                      'Music Theory',
                      'Ear Training',
                    ],
                  },
                  {
                    name: 'Video Platform',
                    type: 'select',
                    tags: ['Zoom', 'Skype', 'Google Meet', 'Custom Platform'],
                  },
                ],
              },
              {
                name: 'Group Online Music Classes',
                image: `https://cdn-icons-png.flaticon.com/512/6928/6928464.png`,
                metadata: [
                  {
                    name: 'Class Size',
                    type: 'select',
                    tags: [
                      '2-4 students',
                      '5-8 students',
                      '9-12 students',
                      '13+ students',
                    ],
                  },
                  {
                    name: 'Course Length',
                    type: 'select',
                    tags: ['4 weeks', '8 weeks', '12 weeks', 'Ongoing'],
                  },
                  {
                    name: 'Specialization',
                    type: 'select',
                    tags: [
                      'General Music Skills',
                      'Genre-Specific',
                      'Ensemble Playing',
                      'Music Production',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Music Transcription',
            features: [
              {
                name: 'Transcription Type',
                type: 'select',
                options: [
                  'Melody',
                  'Chord Chart',
                  'Full Score',
                  'Guitar Tablature',
                  'Bass Tablature',
                  'Drum Notation',
                ],
              },
              {
                name: 'Instrument Focus',
                type: 'select',
                options: [
                  'Piano',
                  'Guitar',
                  'Bass',
                  'Drums',
                  'Strings',
                  'Brass',
                  'Woodwinds',
                  'Vocals',
                ],
              },
              {
                name: 'Notation Software',
                type: 'select',
                options: [
                  'Sibelius',
                  'Finale',
                  'MuseScore',
                  'Guitar Pro',
                  'Custom',
                ],
              },
              {
                name: 'Delivery Format',
                type: 'select',
                options: ['PDF', 'MusicXML', 'MIDI', 'Notation Software File'],
              },
              {
                name: 'Turnaround Time',
                type: 'select',
                options: ['24 hours', '2-3 days', '4-7 days', 'Custom'],
              },
              {
                name: 'Additional Services',
                type: 'select',
                options: [
                  'Transposition',
                  'Arrangement',
                  'Analysis',
                  'Performance Notes',
                ],
              },
            ],
            services: [
              {
                name: 'Song Transcription Service',
                image: `https://thumbs.dreamstime.com/b/black-line-icon-transcription-file-record-letter-tone-song-music-mick-black-line-icon-transcription-music-mick-263882749.jpg`,
                metadata: [
                  {
                    name: 'Song Length',
                    type: 'select',
                    tags: [
                      'Up to 3 minutes',
                      '3-5 minutes',
                      '5-10 minutes',
                      '10+ minutes',
                    ],
                  },
                  {
                    name: 'Complexity',
                    type: 'select',
                    tags: [
                      'Simple (Pop/Rock)',
                      'Moderate (Jazz/Fusion)',
                      'Complex (Classical/Progressive)',
                    ],
                  },
                  {
                    name: 'Accuracy Level',
                    type: 'select',
                    tags: [
                      'Basic (Main Melody/Chords)',
                      'Detailed (All Parts)',
                      'Expert (Including Ornaments/Techniques)',
                    ],
                  },
                ],
              },
              {
                name: 'Custom Arrangement Transcription',
                image: `https://www.shutterstock.com/image-vector/vector-solid-black-icon-transcript-260nw-2470745421.jpg`,
                metadata: [
                  {
                    name: 'Arrangement Type',
                    type: 'select',
                    tags: [
                      'Solo Instrument',
                      'Small Ensemble',
                      'Full Band',
                      'Orchestra',
                    ],
                  },
                  {
                    name: 'Style Adaptation',
                    type: 'select',
                    tags: [
                      'Faithful to Original',
                      'Genre Change',
                      'Simplified Version',
                      'Extended Arrangement',
                    ],
                  },
                  {
                    name: 'Parts Included',
                    type: 'multi_select',
                    tags: [
                      'Full Score',
                      'Individual Parts',
                      'Lead Sheet',
                      'Chord Chart',
                      'Master Rhythm',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Music & Audio Advice',
            features: [
              {
                name: 'Advice Type',
                type: 'select',
                options: [
                  'Career Guidance',
                  'Technical Advice',
                  'Industry Insights',
                  'Equipment Recommendations',
                  'Legal/Business Advice',
                ],
              },
              {
                name: 'Expert Background',
                type: 'select',
                options: [
                  'Producer',
                  'Engineer',
                  'Musician',
                  'Industry Executive',
                  'Music Lawyer',
                  'Marketing Specialist',
                ],
              },
              {
                name: 'Consultation Method',
                type: 'select',
                options: [
                  'Written Report',
                  'Video Call',
                  'Phone Call',
                  'In-Person (if available)',
                ],
              },
              {
                name: 'Session Length',
                type: 'select',
                options: ['30 minutes', '1 hour', '2 hours', 'Custom Duration'],
              },
              {
                name: 'Follow-up Support',
                type: 'select',
                options: [
                  'None',
                  'Email Follow-up',
                  'Additional Short Call',
                  'Ongoing Mentorship',
                ],
              },
              {
                name: 'Resources Provided',
                type: 'select',
                options: [
                  'Industry Contacts',
                  'Templates/Documents',
                  'Software/Tool Recommendations',
                  'Reading Materials',
                ],
              },
            ],
            services: [
              {
                name: 'Music Production Consultation',
                image: `https://static.vecteezy.com/system/resources/previews/007/167/555/non_2x/music-editing-line-icon-on-white-background-free-vector.jpg`,
                metadata: [
                  {
                    name: 'Focus Area',
                    type: 'select',
                    tags: [
                      'Recording Techniques',
                      'Mixing Strategies',
                      'Mastering Advice',
                      'Workflow Optimization',
                      'Equipment Setup',
                    ],
                  },
                  {
                    name: 'Experience Level',
                    type: 'select',
                    tags: [
                      'Beginner',
                      'Intermediate',
                      'Advanced',
                      'Professional',
                    ],
                  },
                  {
                    name: 'Genre Specialization',
                    type: 'select',
                    tags: [
                      'Pop',
                      'Rock',
                      'Hip Hop',
                      'Electronic',
                      'Jazz',
                      'Classical',
                      'World Music',
                    ],
                  },
                ],
              },
              {
                name: 'Music Business Strategy Session',
                image: `https://getdrawings.com/free-icon-bw/icon-composer-9.png`,
                metadata: [
                  {
                    name: 'Career Stage',
                    type: 'select',
                    tags: [
                      'Emerging Artist',
                      'Established Independent',
                      'Major Label Consideration',
                      'Industry Professional',
                    ],
                  },
                  {
                    name: 'Topics Covered',
                    type: 'multi_select',
                    tags: [
                      'Royalties & Publishing',
                      'Digital Distribution',
                      'Tour Planning',
                      'Brand Partnerships',
                      'Funding & Investment',
                    ],
                  },
                  {
                    name: 'Deliverables',
                    type: 'multi_select',
                    tags: [
                      'Action Plan',
                      'Financial Projections',
                      'Marketing Strategy',
                      'Legal Checklist',
                      'Network Introductions',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
