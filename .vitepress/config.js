import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'Ts-Challenges 学习笔记',
    description: 'Ts-Challenges 类型挑战学习记录',
    // base: '/ts-challenge-note/', // 开发模式下注释掉，生产环境需要时再启用
    lang: 'zh-CN',

    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '简单', link: '/easy/' },
            { text: '中等', link: '/medium/' },
            { text: '困难', link: '/hard/' },
            { text: '极限', link: '/extreme/' },
            { text: 'GitHub', link: 'https://github.com/kitcaf/typscript-challange-note' }
        ],

        sidebar: {
            '/easy/': [
                {
                    text: '简单难度',
                    items: [
                        { text: '简介', link: '/easy/' },
                        { text: 'Pick', link: '/easy/00004-pick' },
                        { text: 'Readonly', link: '/easy/00007-readonly' },
                        { text: 'Tuple to Object', link: '/easy/00011-tuple-to-object' },
                        { text: 'First of Array', link: '/easy/00014-first' },
                        { text: 'Length of Tuple', link: '/easy/00018-tuple-length' },
                        { text: 'Exclude', link: '/easy/00043-exclude' },
                        { text: 'Awaited', link: '/easy/00189-awaited' },
                        { text: 'If', link: '/easy/00268-if' },
                        { text: 'Concat', link: '/easy/00533-concat' },
                        { text: 'Includes', link: '/easy/00898-includes' },
                        { text: 'Push', link: '/easy/03057-push' },
                        { text: 'Unshift', link: '/easy/03060-unshift' },
                        { text: 'Parameters', link: '/easy/03312-parameters' }
                    ]
                }
            ],

            '/medium/': [
                {
                    text: '中等难度',
                    items: [
                        { text: '简介', link: '/medium/' },
                        { text: 'Return Type', link: '/medium/00002-return-type' },
                        { text: 'Omit', link: '/medium/00003-omit' },
                        { text: 'Readonly 2', link: '/medium/00008-readonly-2' },
                        { text: 'Deep Readonly', link: '/medium/00009-deep-readonly' },
                        { text: 'Tuple to Union', link: '/medium/00010-tuple-to-union' },
                        { text: 'Chainable Options', link: '/medium/00012-chainable-options' },
                        { text: 'Hello World', link: '/medium/00013-hello-world' },
                        { text: 'Last of Array', link: '/medium/00015-last' },
                        { text: 'Pop', link: '/medium/00016-pop' },
                        { text: 'Promise.all', link: '/medium/00020-promise-all' },
                        { text: 'Type Lookup', link: '/medium/00062-type-lookup' },
                        { text: 'Trim Left', link: '/medium/00106-trimleft' },
                        { text: 'Trim', link: '/medium/00108-trim' },
                        { text: 'Capitalize', link: '/medium/00110-capitalize' },
                        { text: 'Replace', link: '/medium/00116-replace' },
                        { text: 'ReplaceAll', link: '/medium/00119-replaceall' },
                        { text: 'Append Argument', link: '/medium/00191-append-argument' },
                        { text: 'Permutation', link: '/medium/00296-permutation' },
                        { text: 'Length of String', link: '/medium/00298-length-of-string' },
                        { text: 'Flatten', link: '/medium/00459-flatten' },
                        { text: 'Append to object', link: '/medium/00527-append-to-object' },
                        { text: 'Absolute', link: '/medium/00529-absolute' },
                        { text: 'String to Union', link: '/medium/00531-string-to-union' },
                        { text: 'Merge', link: '/medium/00599-merge' },
                        { text: 'KebabCase', link: '/medium/00612-kebabcase' },
                        { text: 'Diff', link: '/medium/00645-diff' },
                        { text: 'AnyOf', link: '/medium/00949-anyof' },
                        { text: 'IsNever', link: '/medium/01042-isnever' },
                        { text: 'IsUnion', link: '/medium/01097-isunion' },
                        { text: 'ReplaceKeys', link: '/medium/01130-replacekeys' },
                        { text: 'Remove Index Signature', link: '/medium/01367-remove-index-signature' },
                        { text: 'Percentage Parser', link: '/medium/01978-percentage-parser' },
                        { text: 'Drop Char', link: '/medium/02070-drop-char' },
                        { text: 'MinusOne', link: '/medium/02257-minusone' },
                        { text: 'PickByType', link: '/medium/02595-pickbytype' },
                        { text: 'StartsWith', link: '/medium/02688-startswith' },
                        { text: 'EndsWith', link: '/medium/02693-endswith' },
                        { text: 'PartialByKeys', link: '/medium/02757-partialbykeys' },
                        { text: 'RequiredByKeys', link: '/medium/02759-requiredbykeys' },
                        { text: 'Mutable', link: '/medium/02793-mutable' },
                        { text: 'OmitByType', link: '/medium/02852-omitbytype' },
                        { text: 'ObjectEntries', link: '/medium/02946-objectentries' },
                        { text: 'Shift', link: '/medium/03062-shift' },
                        { text: 'Tuple to Nested Object', link: '/medium/03188-tuple-to-nested-object' },
                        { text: 'Reverse', link: '/medium/03192-reverse' },
                        { text: 'Flip Arguments', link: '/medium/03196-flip-arguments' },
                        { text: 'FlattenDepth', link: '/medium/03243-flattendepth' },
                        { text: 'BEM style string', link: '/medium/03326-bem-style-string' },
                        { text: 'InorderTraversal', link: '/medium/03376-inordertraversal' },
                        { text: 'Flip', link: '/medium/04179-flip' },
                        { text: 'Fibonacci Sequence', link: '/medium/04182-fibonacci-sequence' },
                        { text: 'Nomiwase', link: '/medium/04260-nomiwase' },
                        { text: 'Greater Than', link: '/medium/04425-greater-than' },
                        { text: 'Zip', link: '/medium/04471-zip' },
                        { text: 'IsTuple', link: '/medium/04484-istuple' },
                        { text: 'Chunk', link: '/medium/04499-chunk' },
                        { text: 'Fill', link: '/medium/04518-fill' },
                        { text: 'Trim Right', link: '/medium/04803-trim-right' },
                        { text: 'Without', link: '/medium/05117-without' },
                        { text: 'Trunc', link: '/medium/05140-trunc' },
                        { text: 'IndexOf', link: '/medium/05153-indexof' },
                        { text: 'Join', link: '/medium/05310-join' },
                        { text: 'LastIndexOf', link: '/medium/05317-lastindexof' },
                        { text: 'Unique', link: '/medium/05360-unique' },
                        { text: 'MapTypes', link: '/medium/05821-maptypes' },
                        { text: 'Construct Tuple', link: '/medium/07544-construct-tuple' },
                        { text: 'Number Range', link: '/medium/08640-number-range' },
                        { text: 'Combination', link: '/medium/08767-combination' },
                        { text: 'Subsequence', link: '/medium/08987-subsequence' },
                        { text: 'CheckRepeatedChars', link: '/medium/09142-checkrepeatedchars' },
                        { text: 'FirstUniqueCharIndex', link: '/medium/09286-firstuniquecharindex' },
                        { text: 'Parse URL Params', link: '/medium/09616-parse-url-params' },
                        { text: 'Get Middle Element', link: '/medium/09896-get-middle-element' },
                        { text: '找出目标数组中只出现过一次的元素', link: '/medium/09898-zhao-chu-mu-biao-shu-zu-zhong-zhi-chu-xian-guo-yi-ci-de-yuan-su' },
                        { text: '统计数组中的元素个数', link: '/medium/09989-tong-ji-shu-zu-zhong-de-yuan-su-ge-shu' },
                        { text: 'Integer', link: '/medium/10969-integer' },
                        { text: 'ToPrimitive', link: '/medium/16259-to-primitive' },
                        { text: 'DeepMutable', link: '/medium/17973-deepmutable' },
                        { text: 'All', link: '/medium/18142-all' },
                        { text: 'Filter', link: '/medium/18220-filter' },
                        { text: 'FindAll', link: '/medium/21104-findall' },
                        { text: '组合键类型 Combination key type', link: '/medium/21106-zu-he-jian-lei-xing-combination-key-type' },
                        { text: 'Permutations of Tuple', link: '/medium/21220-permutations-of-tuple' },
                        { text: 'Replace First', link: '/medium/25170-replace-first' },
                        { text: 'Transpose', link: '/medium/25270-transpose' },
                        { text: 'JSON Schema to TypeScript', link: '/medium/26401-json-schema-to-typescript' },
                        { text: 'Square', link: '/medium/27133-square' },
                        { text: 'Triangular number', link: '/medium/27152-triangular-number' },
                        { text: 'CartesianProduct', link: '/medium/27862-cartesianproduct' },
                        { text: 'MergeAll', link: '/medium/27932-mergeall' },
                        { text: 'CheckRepeatedTuple', link: '/medium/27958-checkrepeatedtuple' },
                        { text: 'Public Type', link: '/medium/28333-public-type' },
                        { text: 'ExtractToObject', link: '/medium/29650-extracttoobject' },
                        { text: 'Deep Omit', link: '/medium/29785-deep-omit' },
                        { text: 'IsOdd', link: '/medium/30301-isodd' },
                        { text: 'Tower of hanoi', link: '/medium/30430-tower-of-hanoi' },
                        { text: 'Pascal\'s triangle', link: '/medium/30958-pascals-triangle' },
                        { text: 'しりとりる', link: '/medium/30970-shitariteraru' },
                        { text: 'Compare Array Length', link: '/medium/34007-compare-array-length' },
                        { text: 'DefinedPartialRecord', link: '/medium/34857-defined-partial-record' },
                        { text: 'Longest Common Prefix', link: '/medium/35045-longest-common-prefix' },
                        { text: 'Trace', link: '/medium/35191-trace' },
                        { text: 'IsAlphabet', link: '/medium/35252-isalphabet' },
                        { text: 'MyUppercase', link: '/medium/35991-myuppercase' }
                    ]
                }
            ],

            '/hard/': [
                {
                    text: '困难难度',
                    items: [
                        { text: '简介', link: '/hard/' },
                        { text: 'Simple Vue', link: '/hard/00006-simple-vue' },
                        { text: 'Currying 1', link: '/hard/00017-currying-1' },
                        { text: 'Union to Intersection', link: '/hard/00055-union-to-intersection' },
                        { text: 'Get Required', link: '/hard/00057-get-required' },
                        { text: 'Get Optional', link: '/hard/00059-get-optional' },
                        { text: 'Required Keys', link: '/hard/00089-required-keys' },
                        { text: 'Optional Keys', link: '/hard/00090-optional-keys' },
                        { text: 'CapitalizeWords', link: '/hard/00112-capitalizewords' },
                        { text: 'CamelCase', link: '/hard/00114-camelcase' },
                        { text: 'C-printf Parser', link: '/hard/00147-c-printf-parser' },
                        { text: 'Vue Basic Props', link: '/hard/00213-vue-basic-props' },
                        { text: 'IsAny', link: '/hard/00223-isany' },
                        { text: 'Typed Get', link: '/hard/00270-typed-get' },
                        { text: 'String to Number', link: '/hard/00300-string-to-number' },
                        { text: 'Tuple Filter', link: '/hard/00399-tuple-filter' },
                        { text: 'Tuple to Enum Object', link: '/hard/00472-tuple-to-enum-object' },
                        { text: 'Printf', link: '/hard/00545-printf' },
                        { text: 'Deep object to unique', link: '/hard/00553-deep-object-to-unique' },
                        { text: 'Length of String 2', link: '/hard/00651-length-of-string-2' },
                        { text: 'Union to Tuple', link: '/hard/00730-union-to-tuple' },
                        { text: 'String Join', link: '/hard/00847-string-join' },
                        { text: 'DeepPick', link: '/hard/00956-deeppick' },
                        { text: 'Pinia', link: '/hard/01290-pinia' },
                        { text: 'Camelize', link: '/hard/01383-camelize' },
                        { text: 'Drop String', link: '/hard/02059-drop-string' },
                        { text: 'Split', link: '/hard/02822-split' },
                        { text: 'ClassPublicKeys', link: '/hard/02828-classpublickeys' },
                        { text: 'IsRequiredKey', link: '/hard/02857-isrequiredkey' },
                        { text: 'ObjectFromEntries', link: '/hard/02949-objectfromentries' },
                        { text: 'IsPalindrome', link: '/hard/04037-ispalindrome' },
                        { text: 'Mutable Keys', link: '/hard/05181-mutable-keys' },
                        { text: 'Intersection', link: '/hard/05423-intersection' },
                        { text: 'Binary to Decimal', link: '/hard/06141-binary-to-decimal' },
                        { text: 'Object Key Paths', link: '/hard/07258-object-key-paths' },
                        { text: 'Two Sum', link: '/hard/08804-two-sum' },
                        { text: 'ValidDate', link: '/hard/09155-validdate' },
                        { text: 'Assign', link: '/hard/09160-assign' },
                        { text: 'Maximum', link: '/hard/09384-maximum' },
                        { text: 'Capitalize Nest Object Keys', link: '/hard/09775-capitalize-nest-object-keys' },
                        { text: 'Replace Union', link: '/hard/13580-replace-union' },
                        { text: 'FizzBuzz', link: '/hard/14080-fizzbuzz' },
                        { text: 'Run-length encoding', link: '/hard/14188-run-length-encoding' },
                        { text: 'Tree path array', link: '/hard/15260-tree-path-array' },
                        { text: 'SnakeCase', link: '/hard/19458-snakecase' },
                        { text: 'IsNegativeNumber', link: '/hard/25747-isnegativenumber' },
                        { text: 'OptionalUndefined', link: '/hard/28143-optionalundefined' },
                        { text: 'Unique Items', link: '/hard/30178-unique-items' },
                        { text: 'BitwiseXOR', link: '/hard/30575-bitwisexor' },
                        { text: 'Sudoku', link: '/hard/31797-sudoku' },
                        { text: 'Length of String 3', link: '/hard/31824-length-of-string-3' },
                        { text: 'Unbox', link: '/hard/32427-unbox' },
                        { text: 'Binary Addition', link: '/hard/32532-binary-addition' },
                        { text: 'Union to Object from Key', link: '/hard/33763-union-to-object-from-key' },
                        { text: 'Take Elements', link: '/hard/34286-take-elements' },
                        { text: 'Valid Sudoku', link: '/hard/35314-valid-sudoku' }
                    ]
                }
            ],

            '/extreme/': [
                {
                    text: '极限难度',
                    items: [
                        { text: '简介', link: '/extreme/' },
                        { text: 'Readonly Keys', link: '/extreme/00005-readonly-keys' },
                        { text: 'Query String Parser', link: '/extreme/00151-query-string-parser' },
                        { text: 'Slice', link: '/extreme/00216-slice' },
                        { text: 'Integers Comparator', link: '/extreme/00274-integers-comparator' },
                        { text: 'Currying 2', link: '/extreme/00462-currying-2' },
                        { text: 'Sum', link: '/extreme/00476-sum' },
                        { text: 'Multiply', link: '/extreme/00517-multiply' },
                        { text: 'Tag', link: '/extreme/00697-tag' },
                        { text: 'Inclusive Range', link: '/extreme/00734-inclusive-range' },
                        { text: 'Sort', link: '/extreme/00741-sort' },
                        { text: 'DistributeUnions', link: '/extreme/00869-distributeunions' },
                        { text: 'Assert Array Index', link: '/extreme/00925-assert-array-index' },
                        { text: 'JSON Parser', link: '/extreme/06228-json-parser' },
                        { text: 'Subtract', link: '/extreme/07561-subtract' },
                        { text: 'CountReversePairs', link: '/extreme/31447-countreversepairs' },
                        { text: 'Parameter Intersection', link: '/extreme/31997-parameter-intersection' },
                        { text: 'Dynamic Route', link: '/extreme/33345-dynamic-route' }
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/kitcaf/typscript-challange-note' }
        ],

        search: {
            provider: 'local'
        },

        editLink: {
            pattern: 'https://github.com/kitcaf/typscript-challange-note/edit/master/:path',
            text: '在 GitHub 上编辑此页'
        },

        lastUpdated: {
            text: '上次更新',
            formatOptions: {
                dateStyle: 'medium',
                timeStyle: 'short'
            }
        },

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024 TypeScript Challenges 学习笔记'
        }
    }
})
