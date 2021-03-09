const sonarqubeScanner = require('sonarqube-scanner');
     sonarqubeScanner({
       serverUrl: 'http://localhost:9000',
       options : {
       'sonar.login': 'admin',
       'sonar.password': 'permadi',
       'sonar.sources': '.',
       'sonar.inclusions' : 'test/*', // Entry point of your code,
       'sonar.dynamicAnalysis' : 'reuseReports',
       'sonar.javascript.lcov.reportPaths' : 'coverage/lcov.info'
       },

        // dynamicAnalysis: 'reuseReports',
        // tests: 'test',
        // javascript: {
        //     jstestdriver: {
        //         reportsPath: 'coverage'
        //     },
        //     lcov: {
        //         reportPath: './coverage/lcov.info'
        //     }
        // },

     }, () => {});