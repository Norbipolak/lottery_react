import { useEffect } from "react";

/*
Csináltunk egy components mappát, de erre nem is lesz szükségünk, mert csak egy components-ünk lesz 
csak, akkor kell ha több van 
*/
function Lottery() {
    const [userNumbers, setUserNumbers] = useState([]);
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [hits, setHits] = useState(0);
    const [numbers, setNumbers] = useState([]);
    const [showHits, setShowHits] = useState(false);
    const [started, setStarted] = useState(true);

    useEffect(() => {
        //itt generáljuk le a számainkat 
        //for(let i = 1; i <= 90; i++){
        //így tesszük be a legenerált számokat a numbers tömbünkbe
        //setNumbers([...numbers, i]);
        /*
        mindig elöször ki kell bontani a tömböt és utána hozzáadni, amit szeretnénk
        ez a verzió itt nem fog müködni, mert ilyenkor a setNumbers meghívását követően a komponens az frissíti önmagát 
        és ilyenkor az elöző értékek, azok mindig kikerülnek a frissítés miatt a memóriából, ezért csak a 90-et fogjuk látni 
        az alatta lévő kettő megoldás müködik itt 
        */
        //setNumbers(n=>[...n, i]);
        //az n az önmaga plusz az i, akkor müködőképes

        /*
        egy másik formája, hogyan lehet beletenni valamit egy tömbbe setteléssel
        setNuumbers(n=>[]...n, i]);
        vagy még ugy lehet, hogy egy változóban csinálunk itt a függvényen belül egy üres tömböt 
        és a for ciklus alatt push-val beletesszük ezeket a számokat(tehát az i-t) az üres tömbbe 

        const ns = [];

        for(let i = 1; i <= 90, i++) {
            ns.push(i);
        }
        és setNumbers(ns);
        */
        /*
        De mivel a useEffect kétszer generálja le a komponenst az elején az ilyenkor problémát fog jelenteni, hiszen 
        kétszer fogja legenerálni a számokat 1-90-ig, tehát csak az a megoldás jó itt, hogy csinákunk egy let-es változóban egy üres 
        tömböt, ma dlegenráljuk egy for ciklussal a számainkat és for ciklus belsejében belepusholjuk őket a tömbünkben, majd a cikluson 
        kivül setteljük őket a numbers useState-s változónkba, mármint a tömböt a számokkal (ns)
        */
        // const ns = [];

        // for (let i = 1; i <= 90; i++) {
        //     ns.push(i);
        // }

        // setNumbers(ns);
        generateNumbers();
        generateRNumbers() //itt meghívjuk azt a függvényt, amelyik legenerálja nekünk a véletlenszerű számainkat

    }, []);

    const generateNumbers = ()=> {
        const ns = [];

        for (let i = 1; i <= 90; i++) {
            ns.push(i);
        }

        setNumbers(ns);
    };

    const clickCell = (cell) => {
        console.log(cell)
        /*
        pl. ha az eggyes cell-re kattintunk rá, akkor ezt fogjuk visszakapni -> <div class="cell">1</div>
        ha pl. az 58-asra, akkor meg ezt -> <div class="cell">58</div>
        emiatt, amit a jsx elemnek adtunk meg -> onClick={e=>clickCell(e.target)
        */
        const n = parseInt(cell.innerText);
        /*
        innen tudjuk az innerText-jéből kiolvasni a számát, hogy 1 vagy 58 és ezt még parseInt-elni kell mert egy stringet ad vissza
        nekünk meg itt egy szám fog kelleni 
        */

        const un = [...userNumbers];//lemásoltuk a userNumbers tömbünket
        //if(un.includes(n)) inkább az index kell a splice miatt nem az includes
        const index = un.indexOf(n);
        console.log(index);
        /*
        indexOf vagy azt mondja meg, hogy hányadik indexen található ez bizonyos érték vagy azt, hogy -1 ha nincs benne
        console.log(index); ha rákattintunk egy számra, akkor berakja a tömbbe és az index, amit kiíratunk az -1, mert eddig az a szám 
        nem volt megtalálható benne, de a másodszor is rákattintunk, belerakja ugyanugy és akkor már az index az 0 lesz, mert ugye az indexOf
        az első előfordulási helyet adja vissza 
        */
        if (index === -1 && userNumbers.length < 5) {
            setUserNumbers(un => [...un, n]);//setteljük a userNumber, kibontott un tömb és amit bele szeretnénk rakni n(number)
            cell.classList.add("selected-cell");
            /*
            ezt a class-t azért adtuk hozzá, hogy megváltozzon ennek a kiválasztott cell-nek háttérszíne és lássuk, hogy ki van választva
            */
        } else if(index !== -1) {
            un.splice(index, 1);
            setUserNumbers(un);
            cell.classList.remove("selected-cell");//itt meg levesszük
        }
        /*
        ha az index minusz -1 akkor rakjuk bele ezt a számot, mert az ugye azt jelenti, hogy eddig nem volt benne
        else-ágban pedig a splice-val kivesszük 
        splice-nál azt kell, hogy hányadik helyen található(index) és akkor ha második paramétere az 1, akkor azon indexen lévő dolgot kiveszi
        */
    };
    // useEffect(() => {
    //     console.log(userNumbers);
    //     /*
    //     Ha megváltozik a userNumbers tömb értéke, akkor kiírjuk, hogy mi van benne, az összes értékét 
    //     Rákattintunk egy számra többször, akkor annyiszor belerakja, ahányszor rákattintottunk, azt akarjuk, hogy ne rakja bele többször 
    //     a második kattintásnál szedje ki, vissszamegyünk a clickCell-be és ott const un = [...userNUmbers];
    //     */
    // }, [userNumbers]);

    const generateRNumbers = ()=> {
        const rNumbers = [];

        while(rNumbers.length < 5) {
            const rNum = Math.floor(Math.random()*90) + 1;
        }

        if(!rNumbers.includes(rNum)) {
            rNumbers.push(rNum);
        }

        console.log(rNumbers);
        /*
        random generál 5 számot egy tömbben -> [71, 3, 23, 79, 60]
        */ 
       setRandomNumbers(rNumbers);
    };

    const play = ()=> {
        if(userNumbers.length < 5)
        return;

        for(const un of userNumbers){
            if(randomNumbers.includes(un)) {
                setHits(h=>h+1);
            }
        }

        setShowHits(true);
    };

    const newGame = ()=> {
        setHits(0);
        setShowHits(false);
        setUserNumbers([]);
        generateRNumbers();
        setNumbers([]);
        setStarted(true);

    };

    useEffect(()=> {
        if(started){
            generateNumbers();
            setStarted(false);
        }
        
    }, [started])

    return (
        <div className="container">
            <div className="results">
                {showHits && <h1>találatok száma: {hits}</h1>}
                <h4>{showHits && userNumbers.join(" ,")}</h4>
                <h4>{showHits && randomNumbers.join(" ,")}</h4>
            </div>

            <div className="lottery-grid">
                {
                    numbers.map((n, i) =>
                        <div onClick={e => clickCell(e.target)}
                            key={i} className="cell">{n}</div>
                    )
                }
            </div>

            <button onClick={play}>Beküldés!</button>

            <button onClick={newGame}>Új játék</button>
        </div>
    );
}

export default Lottery;

/*
Milyen változókra lesz szükségünk -> 
const [userNumbers, setUserNumbers] = useState([]);
ebbe a tömbbe fogjuk gyüjteni a számokat, amiket kiválasztottunk 

const [randomNumbers, setRandomNumbers] = useState([]);
ebben a tömbbe fogjuk tárolni, azokat a számokat, amiket generálunk, ezek lesznek a nyerőszámok

const [hits, setHits] = useState(0);
itt az nézzük meg, hogy hány találatunk volt, ami ugy nulláról indul alapból 

Hogyan tudjuk legenerálni a számokat 1-től 90-ig 
    return(
        <div className="container">
            {
                
            }
        </div>
    );
itt azt tudjuk megtenni, hogy valamilyen adatszerkezeten végigmegyünk, itt nem tudunk pl. for ciklust használni 
mivel itt változót tudunk behelyetesíteni, ezért itt a map-et vagy a reduced-ot, mert az egy darab értékkel kerül vissza, ad vissza!!!!!!!!!!

kell egy numbers változó, generálunk for ciklussal számokat 1-től 90-ig és egy map-val pedig majd kiíratjuk őket
const [numbers, setNumbers] = useState([]); 

itt jön az be, hogy mikor kell legenerálni ezeket a számokat 1-től 90-ig 
->
Akkor, amikor a komponens maga elkészül és utána meg nem!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
ezért kell egy useEffect-es változó, hogy csak egyszer generálja le őket 
    useEffect(()=> {
        for(let i = 1; i <= 90; i++){
            setNumbers([...numbers, i]);//mindig elöször ki kell bontani a tömböt és utána hozzáadni, amit szeretnénk
        }
    });
most szeretnék megjeleníteni ezeket a számokat jsx-elemekként, ugyhogy a numbers tömbön, amibe ugye beletettük a számainkat 
végigmegyünk rajta egy map-vel és megjelenítjük őket div-ekként, amik kapnak egy className="cell"-t 
ez már benne van egy container-be, de belerakjuk még egy className="lottery-grid" div-be
-> 
    return(
        <div className="container">
            <div className="lottery-grid">
            {
                numbers.map((n, i)=>
                <div key={i} className="cell">{n}</div>
                )
            }
            </div>
        </div>
    );
ha belerakunk a map-be egy kapcsoszárójelet, akkor ott azt kell mondanunk, hogy return vagy különben nem lesz jó 
    {
        numbers.map((n, i)=> 
        {
            return <div key={i} className="cell">{n}</div>
        }
        )
    }
mert ha ebben van egy kapcsoszárójel, ez alapból egy eljárás és nem pedig egy függvény, ha ez a kapcsoszárójel nincsen, akkor olyan 
mintha oda lenne írva, hogy return, így szoktuk csinálni

és amit csináltunk a useEffect-ben azzal le van generálva az egész tablázatunk, benne a cell-ek 1-90-ig 
-> 
    useEffect(()=> {

        const ns = [];
        
        for(let i = 1; i <= 90; i++) {
            ns.push(i);
        }

        setNumbers(ns);
        
    }, []);
    css beállítások, ugye van egy .lottery-grid, amiben benne vannak a cell-áink 
    lottery-grid ugye az egy display grid, aminek van 9 oszlopa és 10 sora, ezért grid-template-columns: repeat(9, 1fr) és 
    a grid-template-row: repeat(10, 1fr), megbeszéltük, hogy egy cell az legyen 40*40-es és mivel 9 oszlop van és 10 sor, ennek
    megfelelően itt meg kell adni a height-ot és a width-et, height:400px és a width: 360px lesz még van egy margin: auto, hogy 
    középen legyen az egész 

    .cell formázása
    mindegyiknek van egy border: 1px solid #d7d7d7 és mivel ezek duplikálodnak felül és jobboldalt ezért margin: 0 0 -1px -1px!!!!
    azt szeretnénk, hogy amik bent lesznek ezekben a cell-ekben, azok középen legyenek, ugye a számok, ezért kell egy display: flex 
    és justify-content: center, align-items: center, hogy horizontálisan és vertikálisan is minden középen legyen, és cursor: pointer
    ***************************************************************************************************************
    Most az kell megoldani, hogyha rákattintunk egy cell-re, akkor az bekerüljön a userNumbers-be, amik lesznek a mi kiválaszott számaink
    és emellett megváltozzon a színe is 
    ->
    ezért csinálunk css-ben egy olyan osztályt, hogy .selected-cell, amiben megadtun egy háttérszínt, itt meg csinálunk egy olyan 
    függvényt, hogy clickCell és majd meg kell, hogy kapja azt a mezőt, amire rákkatintunk, ezért adunk neki egy cell paramétert!!!!!!!
    és a numbers.map, ahol csináltunk a div-eket kap egy onClick-et, mármint a maga a div kapja (e=>clickCell(e.target)), tehát, így vissza fogjuk kapni azt a cellát, 
    amire rákkatintottunk 
    -> 
        {
            numbers.map((n, i)=>
            <div onClick={e=>clickCell(e.target)}
            key={i} className="cell">{n}</div>
            )
        }
    van egy event objektumunk és annak a target-je, amire maga az eseménykezelő vonatkoztatva lett azt fogjuk lekérni és 
    a const clickCell = (cell)=> {
        console.log(cell) itt meg megnézzük, hogyha megadtuk a div-eknek onChange-ben ezt, akkor mit fogunk visszakapni 
    } 
    és ha most, így rákkattintunk pl. az eggyes cell-re, akkor ezt fogjuk visszakapni
    <div class="cell">1</div>
    Honnan tudjuk, hogy ennek mi a száma, mert nekünk nem az egész div kell, hanem a szám, ami bele van írva
    ->
    a div innerText-jéből ezt ki lehet olvasni, ezért csinálunk egy n változót, ami a cell.innerText lesz 
    const n = cell.innerText;
    de ez mág egy string lesz, mert innerText-ről van szó, ezért ezt parseINt-elni kell, hogy számot kapjunk 
    const n = parseInt(cell.innerText);
    Így megvan, az a cell, amiről szó van és még azt kell csinálni, hogy a cell classList-jéhez hozzá kell adni, 
    hogy selected-cell, hogy megváltozzon a háttérszíne!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    -> 
    cell.classList.add("selected-cell");

    Most már ki tudunk jelölni cell-eket, de még két problémánk van itt, egyik, hogyha mégegyszer rákattintunk, akkor nem szedi le 
    a kijelőlést, class-t(mert, meggondoltunk magunkat és mégsem azt a cell-t szeretnénk kijelölni), a másik, hogy most, akármennyi cell-t 
    ki tudunk jelölni nem csak 5-öt, amennyire szükségünk van az ötöslottónál 

    kijelőlés visszavonása -> 
    Amennyiben a cell.classList nem tartalmazza a selected-class-t, akkor egyszerűen csak hozzáadjuk 
    -> 
    if(!cell.classList.contains("selected-cell"))
        cell.classList.add("selected-cell");

    különben egy else-vel azt mondjuk, hogy remove, tehát ha tartalmazza, akkor vegye le, ha rákkatintunk mégegyszer

    if(!cell.classList.contains("selected-cell"))
        cell.classList.add("selected-cell");
    else
        cell.classList.remove("selected-cell")

    Még van egy moegoldás, ami hasonló de itt nem tudjuk alkalmazni 
    cell.classList.toggle("selected-cell")
    ezt azt csinálja automatikusan, hogyha ez a class megvan neki,rajta van, akkor leveszi, ha nincs meg akkor meg hozzáadja

    Ezt a számot, amit megkaptunk, azt ugye hozzá kell adni a userNumber useState-s változonkhoz, ide gyüjtjük a számainkat 
    egy tömbbe, de viszont van itt egy kitétel 
    setUserNumber(un=>[...un, n]), ahogy szoktuk kibontjuk a userNumber tömbünket a spread-sheet operatorral és hozzáadunk valamit
    egy numbert, ebben az esetben 
    Erre csinálunk egy useEffect-et, ez a useEffect reagáljon a userNumbers változására(ott alul a userNumbers kell tömbben, hogy arra reagáljon)
    useEffect(()=> {
        console.log(userNumbers);
    }, [userNumbers])
    console.log-val megnézzük, hogyha megváltozik a userNumbers értéke, akkor kiírjuk, hogy mi van a userNumber-ben
    !!!!!!!!!!!! itt az a probléma, hogyha rákattintnuk egy számra, pl. 52-re, akkor azt annyiszor belerakja a userNumbers
    tömbünkben, amennyiszer rákattintottunk, de mi azt szeretnénk, hogyha ez a szám már egyszer benne van, akkor szedjük ki
    megoldása
    -> 
    vissszamegyünk a clickCell-be és ott const un = [...userNUmbers]; amielőtt még setteljük, ugye a userNumber-t
    és még 
    const un = [...userNumbers]; lemásoltuk a userNumbers tömbünket
   
        const index = un.indexOf(n);
        console.log(index);
        
        indexOf vagy azt mondja meg, hogy hányadik indexen található ez bizonyos érték vagy azt, hogy -1 ha nincs benne
        console.log(index); ha rákattintunk egy számra, akkor berakja a tömbbe és az index, amit kiíratunk az -1, mert eddig az a szám 
        nem volt megtalálható benne, de a másodszor is rákattintunk, belerakja ugyanugy és akkor már az index az 0 lesz, mert ugye az indexOf
        az első előfordulási helyet adja vissza 
        
        if(index === -1)
        setUserNumbers(un=>[...un, n]); setteljük a userNumber, kibontott un tömb és amit bele szeretnénk rakni n(number)
        else {
            un.splice(index, 1);
            setUserNumbers(un);
        }
        
        ha az index minusz -1 akkor rakjuk bele ezt a számot, mert az ugye azt jelenti, hogy eddig nem volt benne
        else-ágban pedig a splice-val kivesszük 
        splice-nál azt kell, hogy hányadik helyen található(index) és akkor ha második paramétere az 1, akkor azon indexen lévő dolgot kiveszi

    eddig minden jó, ha rákattintunk, akkor kiveszi azt, amire mégegyszer rákattitunkígy néz ki jelenleg a clickCell -> 
        const clickCell = (cell)=> {

        const n = parseInt(cell.innerText);

        const un = [...userNumbers];

        const index = un.indexOf(n);
        if(index === -1)
        setUserNumbers(un=>[...un, n]);
        else {
            un.splice(index, 1);
            setUserNumbers(un);
        }
    };

    Most jön a második probléma, hogy 5-nél több számot is ki tudunk jelölni 
    ->
    a clickCell elejére kell egy 
    if(userNumbers.length === 5)
        return;
    de igy az a baj, hogy törölni se tudunk 

    tehát csak, akkor engedjük belerakni a számot ha az index === -1 (tehát még nem volt benne és a tömb még nem tartalmaz 5 számot  
    && userNumbers.length < 5 
    -> 
        if(index === -1 && userNumbers.length < 5) {
            setUserNumbers(un=>[...un, n]);
            cell.classList.add("selected-cell");
        } else if(index !== -1){
            un.splice(index, 1);
            setUserNumbers(un);
            cell.classList.remove("selected-cell");
        }

    Ez lett a vágső megoldás, tehát ha az index === -1 && userNumbers.length, akkor az azt jelenti, hogy a szám, amit bele szeretnénk rakni 
    az még nincsen bent a tömbben és a tömbnek sincsen még 5 eleme, tehát bele tudjuk rakni 
    akkor ezzel belerakjuk a userNumbers tömbünkbe a számot -> setUserNumbers(un=>[...un, n]);
    és mlg itt csináljuk meg, hogy ez ki is legyen jelölve, tehát megkapja a selected-cell osztályt -> cell.classList.add("selected-cell");

    Ha másik ágba megyünk be, akkor megnézzük, hogy az adott szám már bent van a tömbünkbe, és igen bent van, mert az indexre nem -1 az true
    akkor a splice-val kivesszük azt az elemet és settel pedig frissítjük a modósított userNumbers-t, amiből ki van véve a szám és 
    végül a remove-val levesszük a classList-et is 

    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Azért kell ide az else if és nem csak az, hogy else, mert akkor elkezdi kitörölni értelmetlenül ezeket a számokat de közben, meg ha 
    azt mondjuk, hogy az index az nem egyenlő -1-vel else if(index !== -1), csak akkor törölje
    ***************************************************************************************************************************
    Következő lépés, hogy véletlen számokat generálunk 
    Erre létrehozunk egy függvényt a generateRNumbers-t (generate random numbers)
    Itt kellene fog nekünk 5 darab véletlenszerű(nyertes) szám 
    lesz benne egy const rNumbers = []; ami egy üres tömb

    és while(rNumbers.length < 5), tehát, addig generálunk számokat, ameddig a rNumbers.length-je kisebb mint 5, nincs benne 5 elem!!!!!!!!!!!
    addig generálunk benne számokat 5-től 90-ig 

    a while ciklus belsejében, pedig egy véltozóban legenáruljuk a számokat 
    const rNum = Math.floor(Math.random()*90) + 1;
    *90 - mert eddig szeretnénk generálni számokat 
    +1, mert alapból 0 és 89 között generálna számokat 

    és még azt kell mondani, hogy rNumbers az nem tartalmazza ezt a véletlen rNum számot, amit generáltunk, 
    mert előfordulhat, hogy ugyanazt a számot generálja le kétszer, akkor belepusholjuk az rNum-ot az rNumbers tömbünkbe

    if(!rNumbers.includes(rNum))
        rNumbers.push(rNum);

    !!!!!!!!!és fontos, hogy ezt a generateRNumbers-t, ezt meghívjuk az első useEffect-ben, mert ugye ezeket a számokat, 
    akkor kell generálni, amikor betölt a komponensünk
    meg, hogy itt a useState-s változónkat setteljük -> setRandomNumbers(rNumbers);

    const generateRNumbers = ()=> {
        const rNumbers = [];

        while(rNumbers.length < 5) {
            const rNum = Math.floor(Math.random()*90) + 1;
        }

        if(!rNumbers.includes(rNum)) {
            rNumbers.push(rNum);
        }

        setRandomNumbers(rNumbers);
    };

    és, így meg vannak a véletlenszerű számaink 
    *****************************************************************************************************************************************
    Következő lépés az, hogy készítünk egy jsx elem button-t, ami a beküldés lesz 
    Ha beküldtük, a számainkat, akkor le kell ellenőrizni, hogy hány találatunk volt (hits)

    Csinálunk egy függvényt, aminek az lesz a neve, hogy play 
    Hogy tudjuk összeszámolni a hit-eket 
    -> 
    végigmegyünk egy for ciklussal a userNumber-jeinken és azt is mondjuk, hogyha a randomNumbers (includes) tartalmazza az un(userNUmbert)
    akkor setteljük a hits-eket, ugyhogy setHits(h=>++h) vagy setHits(h=>h+1)

    const play = ()=> {
    if(userNumbers.length < 5)
        return;

        for(const un of userNumbers){
            if(randomNumbers.includes(un)) {
                setHits(h=>h+1);
            }
        }
    };

    a végén meg a tábla fölé kiírjuk a találatainkat, emellett, megjelenítjük a userNumbers-einket és a randomNumbers-eket
    egy joint-val!!!!!!!!!!!!!!!!!!!!mert ez egy tömb és azt szeretnénk, hogy 55, 45, 34, 22, 41, így jelenjenek meg 
    <h1>találatok száma: {hits}</h1>
    {userNumbers.join(" ,")}
    {randomNumbers.join(" ,")}

    de itt még lesz egy probléma, lejebb a leírás a **** után 
    
    button-nak meg ugye megadjuk a függvényt (play) onClick-vel -> <button onClick={play}>Beküldés</button>
    és akkor onClick-re kapunk majd egy találatszámot 

    Van még egy fontos kitétele a play függvénynek, hogy az elején azt mondjuk, hogy a userNumbers az kisebb mint 5, akkor 
    return, tehát úgy ne tudjunk játszani, hogy nincsen meg az 5 számunk 
    if(userNumbers.length < 5)
        return;
    *******************************************************************************************************************************
    <h1>találatok száma: {hits}</h1>
    {userNumbers.join(" ,")}
    {randomNumbers.join(" ,")}

    csak, így majd az lesz a probléma, hogy rögtön kiírja a randomNumbers-eket mielőtt választanánk mi számokat, ezért 
    létrehozunk egy useState-s változót 

    const [showHits, setShowHits] = useState(false)

    ami, alapból false és lehetne, azt mondani, hogy -> 

    {showHits && <h1>találatok száma: {hits}</h1>}
    <h4>{showHits && userNumbers.join(" ,")}</h4>
    <h4>{showHits && randomNumbers.join(" ,")}</h4>

    ha showHits az true, akkor kiírja ezeket az értékeket különben meg nem 

    és a play-ben legalulra pedig azt fogjuk, mondani, hogy a setShowHits(true) lesz ->

        const play = ()=> {
        if(userNumbers.length < 5)
        return;

        for(const un of userNumbers){
            if(randomNumbers.includes(un)) {
                setHits(h=>h+1);
            }
        }

        setShowHits(true);
    };

    ********************************************************************************************************
    Csinálunk egy új játék gombot, ami majd leűrit mindent és utána újra ki lehet majd választani a számainkat 
    a gomb mellé csinálunk egy newGame függvényt 

    <button>Új játék</button>

    const newGame = ()=> {
        setHits(0);
        setShowHits(false);
        generateRNumbers();
    }

    a szokásos módon megadjuk a newGame-t onClick-vel a button-ünknek -> 
    <button onClick={newGame}>Új játék</button>

    Csináltunk egy generateNumbers függvényt és ami benne volt a useEffect-ben azt áttettük ide 
    ->
    const generateNumbers = ()=> {
        const ns = [];

        for (let i = 1; i <= 90; i++) {
            ns.push(i);
        }

        setNumbers(ns);
    };

    most a useEffect-ben csak a generateRNumbers van meghívva semmi más 

    useEffect(()=> {
        generateRNumbers();
    }, []);

    most a newGame függvényben még a setNumbers azt beállítottuk egy üres tömbre 
        const newGame = ()=> {
        setHits(0);
        setShowHits(false);
        setUserNumbers([]);
        generateRNumbers();
        setNumbers([]);
        setStarted(true);
    }

    és rögtön ezután csináluk egy useEffect-et, ami a numbers változására fog reagálni és azt modnjuk, hogy 
    amennyiben a numbers.length az egyenlő nullával, abban az esetben generálja le a számokat 
    useEffect(()=> {
        if(numbers.length === 0)
        generateNumbers();
    }, [numbers])

    de ez így még mindig nem jó, ezért csinálunk egy started-os useState-s változót 
    const [started, setStarted] = useState(true);

    és nem azt mondjuk, hogy a numbers.length === 0 hanem azt, hogy started és majd arra is reagál nem a numbers változására 
        useEffect(()=> {
        if(started === 0) {
            generateNumbers();
            setStarted(false);
            console.log(started);
        }
    }, [started])

    Ha betöltödik az egész, akkor van egy started true
    Kijelölünk 5 számot és beküldjük őket 
    és mivel a newGame-nél a setStarted az true-ra van állítva, ezért legenerálja ezt a dolgot, ami a useEffect-ben van 
    és ott a useEffectben állítom vissza a started-ot false-ra 
    ******************************************************************************************************************************
    utolsó dolog, hogy megformázzuk a ahol mutatja hits-eket meg a userNumbers és a randomNumbers-öt 
    belerakjuk egy div-be, aminek adunk egy className="results" és ezt majd megformázzuk css-ben 

            <div className="results">
                {showHits && <h1>találatok száma: {hits}</h1>}
                <h4>{showHits && userNumbers.join(" ,")}</h4>
                <h4>{showHits && randomNumbers.join(" ,")}</h4>
            </div>

    .results {
    width: 360px;
    padding: 15px;
    text-align: center;
    margin: 15px auto;
    border: 1px solid #d7d7d7;
}
    */