import { generate } from '@pdfme/generator'
import {
  text,
  image,
  multiVariableText,
  table,
  line,
  svg
} from '@pdfme/schemas'

const jaybenLogo = `<svg width="177px" height="60px" viewBox="0 0 177 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>194B3745-FE6E-4061-9A30-A945694FBF5A</title>
            <desc>Created with sketchtool.</desc>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Home" transform="translate(-70.000000, -29.000000)">
                    <g id="Logo-group" transform="translate(69.000000, 29.000000)">
                        <g id="Group-2" transform="translate(1.497908, 0.000000)">
                            <path d="M16.5009534,1.29600003 L26.6387941,1.29600003 L26.6387941,17.1360001 C26.6387941,19.8240135 26.219384,21.9359924 25.3805514,23.4720001 C24.5417188,25.0080078 23.223573,26.1299966 21.4260746,26.8380001 C19.6285761,27.5460037 17.1600486,27.9000001 14.0204179,27.9000001 C10.425421,27.9000001 7.65132331,27.5280038 5.69804164,26.7840001 C3.74475998,26.0399964 2.3427322,24.8520083 1.49191626,23.2200001 C0.641100324,21.5879919 0.215698735,19.2600152 0.215698735,16.2360001 L10.3535394,16.2360001 C10.3535394,18.0360091 10.4374214,19.2179973 10.6051879,19.7820001 C10.7729544,20.3460029 11.0665415,20.7959984 11.4859578,21.1320001 C11.9053741,21.4680018 12.5344891,21.6360001 13.3733217,21.6360001 C14.4757874,21.6360001 15.2726665,21.3240032 15.7639827,20.7000001 C16.255299,20.075997 16.5009534,19.1040067 16.5009534,17.7840001 L16.5009534,1.29600003 Z M49.4309627,26.9999999 C49.3111295,26.6399981 49.2032812,25.9920046 49.1074146,25.0559999 C48.0528822,26.0400048 46.7287449,26.7419978 45.1349629,27.1619999 C43.541181,27.582002 41.5819371,27.7919999 39.2571724,27.7919999 C35.7820087,27.7919999 33.2715402,27.2400054 31.7256916,26.1359999 C30.1798429,25.0319944 29.4069302,23.3640111 29.4069302,21.1319999 C29.4069302,19.0919897 30.1858345,17.5860048 31.7436665,16.6139999 C33.3014984,15.641995 35.6981271,15.0840006 38.9336243,14.9399999 L46.1595319,14.5799999 C47.0223312,14.5319997 47.6454546,14.400001 48.028921,14.1839999 C48.4123873,13.9679988 48.6041176,13.5600029 48.6041176,12.9599999 C48.6041176,12.3119966 48.2386317,11.8320014 47.507649,11.5199999 C46.7766663,11.2079983 45.7521076,11.0519999 44.433942,11.0519999 C42.9719766,11.0519999 41.8875022,11.243998 41.1804861,11.6279999 C40.4734701,12.0120018 40.0480685,12.5639963 39.9042686,13.2839999 L30.9168213,13.2839999 C31.276321,11.4119905 31.9653517,10.0080046 32.9839342,9.07199989 C34.0025166,8.13599521 35.4225191,7.4760018 37.2439842,7.09199988 C39.0654493,6.70799796 41.6418251,6.51599988 44.9731889,6.51599988 C49.6706515,6.51599988 52.9839906,7.11599388 54.9133056,8.31599989 C56.8426206,9.51600589 57.8072636,11.4959861 57.8072636,14.2559999 L57.8072636,24.0839999 C57.8072636,24.6360027 57.8671793,25.1279977 57.9870126,25.5599999 C58.1068458,25.9920021 58.3225424,26.4719973 58.6341088,26.9999999 L49.4309627,26.9999999 Z M48.8198165,18.0360003 L47.9929713,18.1800003 L46.7706785,18.3600003 C45.644246,18.5280012 44.3261002,18.6599999 42.8162015,18.7560003 C41.3063027,18.8520008 40.3117018,19.037999 39.8323688,19.3140003 C39.3530359,19.5900017 39.113373,20.0879967 39.113373,20.8080003 C39.113373,21.5040038 39.3829937,22.0499983 39.9222433,22.4460003 C40.4614928,22.8420023 41.3063045,23.0400003 42.4567035,23.0400003 C44.5897351,23.0400003 46.1715101,22.7100036 47.2020759,22.0500003 C48.2326418,21.389997 48.7718832,20.3640073 48.8198165,18.9720003 L48.8198165,18.0360003 Z M62.1571888,27.9000005 C62.5885885,27.9720009 63.2356783,28.0080006 64.0984776,28.0080006 C65.29681,28.0080006 66.0457565,27.960001 66.3453396,27.8640005 C66.6449227,27.7680001 66.9265266,27.5820019 67.1901597,27.3060005 C67.4537929,27.0299991 67.8013041,26.4000054 68.2327037,25.4160004 L59.1014565,7.3079997 L68.5203021,7.3079997 L72.8702269,17.4240001 L77.2201518,7.3079997 L86.6389974,7.3079997 L75.6383609,30.1320006 C75.1350613,31.188006 74.607803,31.985998 74.0565701,32.5260007 C73.5053372,33.0660035 72.8342811,33.4559996 72.0433817,33.6960008 C71.2524823,33.936002 69.9702859,34.0560008 68.1967539,34.0560008 C66.4711553,34.0320007 64.457987,33.9240018 62.1571888,33.7320008 L62.1571888,27.9000005 Z M88.0050904,26.9999999 L88.0050904,0.395999998 L96.9925378,0.395999998 L96.9925378,9.53999997 L97.0644374,9.53999997 C98.5983027,7.69199073 101.186662,6.76799998 104.829592,6.76799998 C108.160956,6.76799998 110.857163,7.69199073 112.918295,9.53999997 C114.979426,11.3880092 116.02196,13.9679834 116.045926,17.2799999 C116.045926,20.496016 115.045334,23.0519904 113.044119,24.9479999 C111.042904,26.8440094 108.304756,27.7919999 104.829592,27.7919999 C102.888294,27.7919999 101.270569,27.5580022 99.9763703,27.0899999 C98.6821714,26.6219976 97.6156717,25.8960048 96.776839,24.9119999 L96.7049395,24.9119999 L96.7049395,26.9999999 L88.0050904,26.9999999 Z M96.9925381,17.2799997 C96.9925381,18.7200069 97.3819903,19.8239959 98.1609064,20.5919998 C98.9398224,21.3600036 100.192061,21.7439998 101.91766,21.7439998 C103.547392,21.7439998 104.775664,21.3540037 105.602513,20.5739998 C106.429363,19.7939959 106.842781,18.6960068 106.842781,17.2799997 C106.842781,15.935993 106.417379,14.8560037 105.566563,14.0399996 C104.715748,13.2239955 103.499458,12.8159996 101.91766,12.8159996 C98.6342289,12.8159996 96.9925381,14.3039848 96.9925381,17.2799997 Z M127.406055,19.2599999 C127.453988,20.2920051 127.987238,21.1439965 129.005821,21.8159999 C130.024403,22.4880033 131.300608,22.8239999 132.834473,22.8239999 C134.008839,22.8239999 134.961499,22.6920012 135.692482,22.4279999 C136.423465,22.1639986 137.028613,21.720003 137.507946,21.0959999 L147.070591,21.0959999 C146.375558,23.2560107 144.841715,24.9119941 142.469017,26.0639999 C140.096319,27.2160057 136.956736,27.7919999 133.050172,27.7919999 C128.160976,27.7919999 124.464176,26.886009 121.959662,25.0739999 C119.455147,23.2619908 118.202909,20.6160173 118.202909,17.1359999 C118.202909,13.7759831 119.437173,11.1660092 121.905737,9.30599989 C124.374302,7.44599058 127.813464,6.51599988 132.223327,6.51599988 C137.328223,6.51599988 141.096922,7.53598968 143.529536,9.57599989 C145.962151,11.6160101 147.17844,14.7599787 147.17844,19.0079999 L147.17844,19.2599999 L127.406055,19.2599999 Z M138.1191,14.7240001 C137.999267,13.6439947 137.472008,12.7980032 136.537309,12.1860002 C135.60261,11.5739971 134.34438,11.2680002 132.762581,11.2680002 C131.252682,11.2680002 130.048377,11.5259976 129.149627,12.0420002 C128.250878,12.5580027 127.669696,13.4519938 127.406062,14.7240001 L138.1191,14.7240001 Z M167.166521,27.0000001 L167.166521,16.6680002 C167.166521,15.5639946 166.872934,14.7180031 166.285751,14.1300002 C165.698568,13.5419972 164.841773,13.2480002 163.715341,13.2480002 C162.397176,13.2480002 161.372617,13.661996 160.641634,14.4900002 C159.910651,15.3180043 159.545166,16.4279932 159.545166,17.8200001 L159.545166,27.0000001 L150.557718,27.0000001 L150.557718,7.30800021 L159.257567,7.30800021 L159.257567,9.7560002 L159.329467,9.7560002 C160.096399,8.84399564 161.216823,8.11800291 162.690772,7.57800021 C164.164721,7.03799751 165.752487,6.76800022 167.454119,6.76800022 C170.23425,6.76800022 172.379233,7.43999349 173.889132,8.7840002 C175.39903,10.1280069 176.153968,11.9759884 176.153968,14.3280002 L176.153968,27.0000001 L167.166521,27.0000001 Z" id="Jayben" fill="#004B80"></path>
                            <g id="Group" transform="translate(0.000000, 37.500000)">
                                <rect id="Rectangle" fill="#004B80" x="0" y="0" width="176.004184" height="22.5"></rect>
                                <path d="M29.8008793,16.5000001 L28.4827203,16.5000001 L28.1681596,15.1050001 C27.718785,15.6450028 27.1395997,16.0624986 26.4305864,16.3575001 C25.721573,16.6525015 24.9426687,16.8000001 24.0938499,16.8000001 C22.6858093,16.8000001 21.5099633,16.5525025 20.5662766,16.0575001 C19.6225898,15.5624976 18.9260696,14.8925043 18.4766949,14.0475001 C18.0273203,13.2024959 17.8026363,12.2350055 17.8026363,11.1450001 C17.8026363,10.0849948 18.0298168,9.13000436 18.4841845,8.28000011 C18.9385522,7.42999587 19.6325759,6.75250265 20.5662766,6.24750012 C21.4999772,5.7424976 22.6558513,5.49000013 24.0339336,5.49000013 C25.0724883,5.49000013 26.006175,5.65749845 26.8350215,5.99250013 C27.6638681,6.3275018 28.3129551,6.78249725 28.7823019,7.35750012 C29.2516488,7.93250299 29.5262625,8.55999671 29.6061513,9.24000011 L27.1795404,9.24000011 C26.9898044,8.56999676 26.6103382,8.05750189 26.0411303,7.70250012 C25.4719224,7.34749834 24.7828916,7.17000012 23.9740173,7.17000012 C22.7157683,7.17000012 21.7621097,7.51499667 21.113013,8.20500012 C20.4639163,8.89500356 20.1393728,9.89999351 20.1393728,11.2200001 C20.1393728,12.1100045 20.309134,12.8474972 20.6486615,13.4325001 C20.988189,14.017503 21.4375569,14.4449987 21.9967787,14.7150001 C22.5560005,14.9850014 23.1751296,15.1200001 23.8541846,15.1200001 C24.8727671,15.1200001 25.6941118,14.9000023 26.3182433,14.4600001 C26.9423747,14.0199979 27.3542953,13.3000051 27.5540174,12.3000001 L24.5282432,12.3000001 L24.5282432,10.6200001 L29.8008793,10.6200001 L29.8008793,16.5000001 Z M50.711673,5.79000013 L57.482217,5.79000013 C58.6905355,5.79000013 59.5942643,6.03499768 60.1934305,6.52500012 C60.7925967,7.01500256 61.0921753,7.7399953 61.0921753,8.70000008 C61.0921753,9.40000357 60.9249106,9.96499791 60.5903761,10.395 C60.2558416,10.8250022 59.8339351,11.1199992 59.3246439,11.28 L59.3246439,11.31 C59.8738795,11.4300006 60.2708212,11.7124978 60.5154807,12.1575 C60.7601402,12.6025022 60.8824682,13.2849954 60.8824682,14.205 C60.8924543,14.8650033 60.9348946,15.3649983 61.0097903,15.7049999 C61.0846861,16.0450016 61.1920351,16.309999 61.3318405,16.4999999 L58.9052296,16.4999999 C58.8253408,16.3499992 58.7604321,16.1400013 58.7105016,15.8699999 C58.6605711,15.5999986 58.6356062,15.2700019 58.6356062,14.88 C58.6356062,14.1799965 58.5781869,13.6600017 58.4633468,13.32 C58.3485066,12.9799983 58.156277,12.7200009 57.8866522,12.54 C57.6170274,12.3599991 57.2475471,12.27 56.7782003,12.27 L52.9585349,12.27 L52.9585349,16.4999999 L50.711673,16.4999999 L50.711673,5.79000013 Z M56.8381164,10.5900001 C57.4672408,10.5900001 57.9440701,10.4775012 58.2686184,10.2525001 C58.5931667,10.027499 58.7554385,9.61500313 58.7554385,9.01500015 C58.7554385,8.46499742 58.5856773,8.07000139 58.2461498,7.83000019 C57.9066223,7.589999 57.4372825,7.47000021 56.8381164,7.47000021 L52.9585349,7.47000021 L52.9585349,10.5900001 L56.8381164,10.5900001 Z M87.3355249,5.49000013 C88.7435653,5.49000013 89.9194113,5.73749765 90.863098,6.23250012 C91.8067846,6.7275026 92.5033048,7.39749589 92.9526795,8.24250011 C93.4020541,9.08750434 93.626738,10.0549947 93.626738,11.1450001 C93.626738,12.2350055 93.4020541,13.2024959 92.9526795,14.0475001 C92.5033048,14.8925043 91.8142741,15.5624976 90.8855666,16.0575001 C89.956859,16.5525025 88.7735237,16.8000001 87.3355249,16.8000001 C85.9274844,16.8000001 84.7516385,16.5525025 83.8079518,16.0575001 C82.8642652,15.5624976 82.167745,14.8925043 81.7183703,14.0475001 C81.2689957,13.2024959 81.0443118,12.2350055 81.0443118,11.1450001 C81.0443118,10.0749948 81.2689957,9.11250439 81.7183703,8.25750011 C82.167745,7.40249584 82.8642652,6.7275026 83.8079518,6.23250012 C84.7516385,5.73749765 85.9274844,5.49000013 87.3355249,5.49000013 Z M87.3355217,7.17000014 C86.1272032,7.17000014 85.1660552,7.52999655 84.4520488,8.25000017 C83.7380424,8.9700038 83.3810445,9.93499419 83.3810445,11.1450003 C83.3810445,12.3650064 83.7405389,13.3324968 84.4595383,14.0475004 C85.1785377,14.762504 86.1371893,15.1200004 87.3355217,15.1200004 C88.5538263,15.1200004 89.5174708,14.762504 90.2264841,14.0475004 C90.9354975,13.3324968 91.2899988,12.3650064 91.2899988,11.1450003 C91.2899988,9.93499419 90.933001,8.9700038 90.2189946,8.25000017 C89.5049882,7.52999655 88.5438402,7.17000014 87.3355217,7.17000014 Z M113.848498,5.79000013 L116.09536,5.79000013 L116.09536,11.8350003 C116.09536,12.585004 116.14529,13.1374985 116.245151,13.4925003 C116.345012,13.8475021 116.50978,14.1399992 116.73946,14.3700003 C116.969141,14.6000015 117.263726,14.7824996 117.623226,14.9175003 C117.982726,15.052501 118.467044,15.1200003 119.076197,15.1200003 C119.675363,15.1200003 120.159682,15.055001 120.529167,14.9250003 C120.898653,14.7949997 121.198232,14.6100015 121.427912,14.3700003 C121.657593,14.1299991 121.822361,13.8350021 121.922222,13.4850003 C122.022083,13.1349985 122.072013,12.585004 122.072013,11.8350003 L122.072013,5.79000013 L124.318874,5.79000013 L124.318874,11.8950003 C124.318874,12.7750047 124.253966,13.444998 124.124146,13.9050003 C123.994327,14.3650026 123.809587,14.7674986 123.56992,15.1125003 C123.330254,15.4575021 123.020689,15.7499991 122.641218,15.9900003 C122.261746,16.2300016 121.77493,16.4249996 121.180757,16.5750004 C120.586584,16.7250011 119.885071,16.8000004 119.076197,16.8000004 C118.19742,16.8000004 117.458459,16.7175012 116.859293,16.5525004 C116.260127,16.3874995 115.778305,16.1775016 115.413812,15.9225003 C115.049319,15.6674991 114.76472,15.3850019 114.560004,15.0750003 C114.355289,14.7649988 114.185528,14.3875025 114.050716,13.9425003 C113.915903,13.4974981 113.848498,12.8150049 113.848498,11.8950003 L113.848498,5.79000013 Z M145.139794,5.79000013 L151.730589,5.79000013 C152.869005,5.79000013 153.73279,6.0824972 154.32197,6.66750012 C154.91115,7.25250303 155.205735,8.06999484 155.205735,9.12000007 C155.205735,10.0900049 154.898667,10.882497 154.284522,11.4975 C153.670377,12.1125031 152.82906,12.42 151.760547,12.42 L147.386656,12.42 L147.386656,16.4999999 L145.139794,16.4999999 L145.139794,5.79000013 Z M147.386656,10.7400003 L150.996614,10.7400003 C151.715614,10.7400003 152.222401,10.6150016 152.516991,10.3650003 C152.811581,10.114999 152.958874,9.70000318 152.958874,9.12000026 C152.958874,8.56999749 152.801595,8.1575016 152.487033,7.88250022 C152.172471,7.60749884 151.730592,7.47000021 151.161384,7.47000021 L147.386656,7.47000021 L147.386656,10.7400003 Z" id="GROUP" fill="#FFFFFF"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>`

const template = {
  schemas: [
    [
      {
        type: 'line',
        position: { x: 25, y: 20 },
        width: 160,
        height: 2.2,
        color: '#004273',
        alignment: 'center',
        name: 'headerLine'
      },
      {
        type: 'svg',
        position: { x: 20, y: 30 },
        content: jaybenLogo,
        width: 60,
        height: 20,
        readOnly: true,
        name: 'logo'
      },
      {
        type: 'text',
        position: { x: 120.13, y: 30 },
        content: 'Purchase Order',
        width: 69.87,
        height: 22.68,
        rotate: 0,
        alignment: 'right',
        verticalAlignment: 'middle',
        fontSize: 40,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '',
        opacity: 1,
        readOnly: true,
        fontName: '',
        name: 'head'
      },
      {
        type: 'text',
        position: { x: 20, y: 57.88 },
        content: 'Billed to:',
        width: 84.69,
        height: 9.42,
        rotate: 0,
        alignment: 'left',
        verticalAlignment: 'top',
        fontSize: 13,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '',
        opacity: 1,
        readOnly: true,
        fontName: '',
        name: 'billedToLabel'
      },
      {
        type: 'text',
        content:
          'Imani Olowe \n+123-456-7890 \n63 Ivy Road, Hawkville, GA, USA 31036',
        position: { x: 20, y: 67.94 },
        width: 84.95,
        height: 34.07,
        rotate: 0,
        alignment: 'left',
        verticalAlignment: 'top',
        fontSize: 13,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '',
        opacity: 1,
        dynamicFontSize: { min: 3, max: 13, fit: 'vertical' },
        fontName: '',
        name: 'billedToInput'
      },
      {
        type: 'text',
        position: { x: 120, y: 57.88 },
        content: 'Shipped to:',
        width: 84.69,
        height: 9.42,
        rotate: 0,
        alignment: 'left',
        verticalAlignment: 'top',
        fontSize: 13,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '',
        opacity: 1,
        readOnly: true,
        fontName: '',
        name: 'shippedToLabel'
      },
      {
        type: 'text',
        content:
          'Imani Olowe \n+123-456-7890 \n63 Ivy Road, Hawkville, GA, USA 31036',
        position: { x: 120, y: 67.94 },
        width: 84.95,
        height: 34.07,
        rotate: 0,
        alignment: 'left',
        verticalAlignment: 'top',
        fontSize: 13,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '',
        opacity: 1,
        dynamicFontSize: { min: 3, max: 13, fit: 'vertical' },
        fontName: '',
        name: 'shippedToInput'
      },
      // {
      //   type: 'multiVariableText',
      //   position: { x: 119.87, y: 67.88 },
      //   content: '{"InvoiceNo":"12345","Date":"16 June 2025"}',
      //   width: 70.13,
      //   height: 33.52,
      //   rotate: 0,
      //   alignment: 'right',
      //   verticalAlignment: 'top',
      //   fontSize: 13,
      //   lineHeight: 1.5,
      //   characterSpacing: 0,
      //   fontColor: '#000000',
      //   backgroundColor: '',
      //   opacity: 1,
      //   strikethrough: false,
      //   underline: false,
      //   text: 'Invoice No.{InvoiceNo}\n{Date}',
      //   variables: ['InvoiceNo', 'Date'],
      //   fontName: '',
      //   name: 'info'
      // },
      {
        type: 'table',
        position: { x: 20, y: 110.81 },
        width: 170,
        height: 45.75920000000001,
        content:
          '[["Eggshell Camisole Top","1","123","123"],["Cuban Collar Shirt","2","127","254"]]',
        showHead: true,
        head: [
          'Item',
          'Qty',
          'Unit Price (exc. GST)',
          'Total Unit Price (exc. GST)',
          'Total Unit Price (with GST)'
        ],
        headWidthPercentages: [
          19.46366230541769, 18.125709261669424, 15.543097772986739,
          21.867530659926153, 25
        ],
        fontName: '',
        tableStyles: { borderWidth: 0, borderColor: '#000000' },
        headStyles: {
          fontName: '',
          fontSize: 11,
          characterSpacing: 0,
          alignment: 'center',
          verticalAlignment: 'middle',
          lineHeight: 1,
          fontColor: '#000000',
          borderColor: '#000000',
          backgroundColor: '#f0f4f7',
          borderWidth: {
            top: 0.1,
            right: 0.1,
            bottom: 0.0,
            left: 0.1
          },
          padding: {
            top: 2,
            right: 1,
            bottom: 2,
            left: 1
          }
        },
        bodyStyles: {
          fontName: '',
          fontSize: 8,
          characterSpacing: 0,
          alignment: 'center',
          verticalAlignment: 'middle',
          lineHeight: 1,
          fontColor: '#000000',
          borderColor: '#000000',
          backgroundColor: '',
          alternateBackgroundColor: '',
          borderWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 },
          padding: { top: 2, right: 2, bottom: 2, left: 2 }
        },
        columnStyles: { alignment: { '0': 'left', '3': 'right' } },
        name: 'orders',
        readOnly: false
      },
      {
        type: 'text',
        position: { x: 133.01, y: 156.89 },
        content: 'Subtotal',
        width: 25.42,
        height: 8.09,
        rotate: 0,
        alignment: 'right',
        verticalAlignment: 'middle',
        fontSize: 13,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '#f0f4f7',
        opacity: 1,
        readOnly: true,
        fontName: '',
        name: 'subtotalLabel'
      },
      {
        type: 'multiVariableText',
        position: { x: 118.73, y: 164.98 },
        name: 'taxInput',
        content: '{"rate":"10"}',
        width: 40.2,
        height: 9.18,
        rotate: 0,
        alignment: 'right',
        verticalAlignment: 'middle',
        fontSize: 13,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '#f0f4f7',
        opacity: 1,
        strikethrough: false,
        underline: false,
        readOnly: false,
        text: 'Total (exc. GST)',
        variables: ['rate'],
        required: false,
        dynamicFontSize: { min: 4, max: 13, fit: 'vertical' },
        fontName: ''
      },
      {
        type: 'line',
        position: { x: 132.09, y: 174.35 },
        width: 52.91,
        height: 0.1,
        rotate: 0,
        opacity: 1,
        readOnly: true,
        color: '#000000',
        name: 'line',
        content: ''
      },
      {
        type: 'text',
        content: '{totalExcTax}',
        position: { x: 158.79, y: 157.1 },
        width: 26.21,
        height: 7.56,
        rotate: 0,
        alignment: 'right',
        verticalAlignment: 'middle',
        fontSize: 12,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '#f0f4f7',
        opacity: 1,
        fontName: '',
        name: 'subtotal',
        readOnly: true,
        required: false
        // dynamicFontSize: { min: 4, max: 13, fit: 'horizontal' }
      },
      {
        type: 'text',
        content: '{totalTax}',
        position: { x: 158.79, y: 164.98 },
        width: 26.21,
        height: 8.89,
        rotate: 0,
        alignment: 'right',
        verticalAlignment: 'middle',
        fontSize: 13,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '#f0f4f7',
        opacity: 1,
        fontName: '',
        name: 'tax',
        readOnly: true,
        required: false
        // dynamicFontSize: { min: 4, max: 13, fit: 'horizontal' }
      },

      {
        type: 'text',
        position: { x: 131.94, y: 174.64 },
        content: 'Total with tax:',
        width: 27.01,
        height: 11,
        rotate: 0,
        alignment: 'right',
        verticalAlignment: 'middle',
        fontSize: 12,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        fontName: '',
        backgroundColor: '#f0f4f7',
        opacity: 1,
        readOnly: true,
        name: 'totalTextLabel'
      },
      {
        type: 'text',
        content: '{totalWithTax}',
        position: { x: 159.05, y: 174.64 },
        width: 25.95,
        height: 11,
        rotate: 0,
        alignment: 'right',
        verticalAlignment: 'middle',
        fontSize: 12,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '#f0f4f7',
        opacity: 1,
        fontName: '',
        name: 'total',
        readOnly: true,
        required: false
        // dynamicFontSize: { min: 4, max: 20, fit: 'horizontal' }
      },

      {
        type: 'text',
        position: { x: 20, y: 232.67 },
        content: 'Payment Information',
        width: 84.69,
        height: 9.42,
        rotate: 0,
        alignment: 'left',
        verticalAlignment: 'top',
        fontSize: 13,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '',
        opacity: 1,
        readOnly: true,
        fontName: '',
        name: 'paymentInfoLabel'
      },
      {
        type: 'text',
        content:
          'Briard Bank\nAccount Name: Dhio Aulia Harrisa\nAccount No.: 123-456-7890\nPay by: 5 July 2025',
        position: { x: 20, y: 242.83 },
        width: 84.95,
        height: 34.07,
        rotate: 0,
        alignment: 'left',
        verticalAlignment: 'top',
        fontSize: 13,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '',
        opacity: 1,
        dynamicFontSize: { min: 8, max: 13, fit: 'vertical' },
        fontName: '',
        name: 'paymentInfoInput'
      },
      {
        type: 'text',
        position: { x: 119.33, y: 248.39 },
        content: 'Dhio Aulia Harrisa',
        width: 70.67,
        height: 8.36,
        rotate: 0,
        alignment: 'right',
        verticalAlignment: 'top',
        fontSize: 18,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '',
        opacity: 1,
        readOnly: true,
        fontName: '',
        name: 'shopName'
      },
      {
        type: 'text',
        position: { x: 107.69, y: 256.9 },
        content: '123 Anywhere St., Any City, ST 12345',
        width: 82.31,
        height: 20,
        rotate: 0,
        alignment: 'right',
        verticalAlignment: 'top',
        fontSize: 13,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '',
        opacity: 1,
        readOnly: true,
        fontName: '',
        name: 'shopAddress'
      }
    ]
  ],
  basePdf: {
    width: 210,
    height: 297,
    padding: [20, 20, 20, 20],
    staticSchema: [
      {
        name: 'line',
        type: 'line',
        position: { x: 20, y: 279 },
        width: 170,
        height: 0.2,
        rotate: 0,
        opacity: 1,
        readOnly: true,
        color: '#999999',
        required: false,
        content: ''
      },
      {
        name: 'footerInfo',
        type: 'text',
        content: 'PO No.{info.InvoiceNo} • {total}USD due {date}',
        position: { x: 20, y: 282 },
        width: 122.51,
        height: 10,
        rotate: 0,
        alignment: 'left',
        verticalAlignment: 'middle',
        fontSize: 13,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '',
        opacity: 1,
        strikethrough: false,
        underline: false,
        required: false,
        readOnly: true
      },
      {
        name: 'pageNumber',
        type: 'text',
        content: 'Page {currentPage} of {totalPages}',
        position: { x: 145, y: 282 },
        width: 45,
        height: 10,
        rotate: 0,
        alignment: 'right',
        verticalAlignment: 'middle',
        fontSize: 13,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: '#000000',
        backgroundColor: '',
        opacity: 1,
        strikethrough: false,
        underline: false,
        required: false,
        readOnly: true
      }
    ]
  }
}

const inputs = [
  {
    billedToInput:
      'Dhio Aulia Harrisa\n+6281234567890\nJl. Raya No. 123, Jakarta, Indonesia',
    shippedToInput:
      'Dhio Aulia Harrisa\n+6281234567890\nJl. Raya No. 123, Jakarta, Indonesia',
    info: JSON.stringify({
      InvoiceNo: 'INV-2023-001',
      Date: '15 November 2023'
    }),
    taxInput: '{"rate":"10"}',

    // Payment Information
    paymentInfoInput:
      'Acme Bank\nAccount Name: John Doe\nAccount No.: ****-7890\nRouting No.: 123456789\nPay by: 30 November 2023',

    // Shop Information
    shopName: 'Acme Inc.',
    shopAddress: '456 Business Ave, Suite 100\nSan Francisco, CA 94107',
    // Footer Information (for staticSchema)
    footerInfo: JSON.stringify({
      InvoiceNo: 'INV-2023-001',
      total: '199.94',
      date: '30 November 2023'
    }),

    // Page Numbering
    pageNumber: JSON.stringify({
      currentPage: '1',
      totalPages: '1'
    })
  }
]

type CheckoutLine = {
  variant: {
    product: {
      name: string
    }
  }
  quantity: number
  unitPrice: {
    gross: {
      amount: number
    }
  }
  totalPrice: {
    gross: {
      amount: number
    }
  }
}

type GeneratePurchaseOrderPdfParams = {
  checkoutLines: CheckoutLine[]
  totalWithTax: number
  totalExcTax: number
}

export const generatePDFInquiredProducts = async ({
  checkoutLines,
  totalWithTax,
  totalExcTax
}: GeneratePurchaseOrderPdfParams) => {
  const orders = []
  checkoutLines.forEach((checkout) => {
    const order = [
      checkout.variant.product.name,
      checkout.quantity.toString(),
      formatPrice(checkout.unitPrice.net.amount),
      formatPrice(checkout.totalPrice.net.amount),
      formatPrice(checkout.totalPrice.gross.amount)
    ]
    orders.push(order)
  })

  inputs[0].orders = orders
  inputs[0].totalWithTax = formatPrice(totalWithTax)
  inputs[0].totalExcTax = formatPrice(totalExcTax)
  inputs[0].totalTax = formatPrice(totalWithTax - totalExcTax)

  // return
  const pdf = await generate({
    template,
    inputs,
    plugins: {
      text,
      image,
      multiVariableText,
      Table: table,
      line,
      svg
    }
  })
  const blob = new Blob([pdf.buffer], { type: 'application/pdf' })
  window.open(URL.createObjectURL(blob))
}
