
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './component/navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

//storage
  const [food, setFood] = useState([]);
  const [input, setInput] = useState("");
  const [rech, setRech] = useState("");
  useEffect(()=>{
    let foodBDD = localStorage.getItem("food");
    if(foodBDD === null) {
        localStorage.setItem("food", JSON.stringify([]));
        foodBDD = [];
    }
    setFood(JSON.parse(foodBDD))
}, []);

useEffect(()=>{
    localStorage.setItem("food",JSON.stringify(food));
}, [food]);

//ajouter element
  function ajouter(input) {
    axios.get(`https://world.openfoodfacts.org/api/v0/product/${input}.json`)
      .then(datas => {
        if (datas.status === 200) {
          let tmp = [...food]
          
            tmp.push(datas.data)
          
          
          setFood(tmp)
        };
      })

  }
  //supprimer
  function supprimer(foo){
    let tmp = [...food];
    const indice = food.indexOf(foo);
    if(indice > -1) tmp.splice(indice,1);
    setFood(tmp);
}
//chercher
function rechercher(strRech, liste){
  let tmpRech = strRech.toLowerCase();
  let res = liste.filter(foo => {
      let lowerFoo = foo.product.product_name_fr.toLowerCase();
      if(lowerFoo.indexOf(tmpRech) > - 1) return foo;
  });

  return(res)
}

//recuperer les donnees
  let ligneFood = rechercher(rech, food).map((foo) => {
    return (
      <article className="card" style={{ height: '50%'}}>
        <div className="cards">
          <img className="card-img-top" src={foo.product.image_url} alt="Card image cap" width="50" height="325"/>
          <div className="card-body">
            <h5 className="card-title" style={{color:'brown'}}>++{foo.product.product_name_fr}</h5>
            <p className="card-text">brand du produit:**{foo.product.brands}**</p>
            <h6 className="card-text">nutriscore:*{foo.product.nutriscore_grade}*</h6>

            <a onClick={()=>supprimer(foo)} className="btn btn-sm btn-danger">Supprimer</a>
          </div>
        </div>
      </article>


    )
  }

  )

  return (
    <div className="App body">
      <header className="App-header">

        <Navbar />
      </header>
      <main >
        <h3 className="message">--scannez votre produit ici 😊--</h3>
        <div Align="center"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="coul" onClick={() => ajouter(input)}>+scanner</button></div>
        { food.length > 0 &&
                <div className="input-group mb-3">
                    <input type="search" value={rech} onChange={(e)=>setRech(e.target.value)} className="form-control" placeholder="Rechercher ..."  />
                    <button className="btn btn-outline-info" type="button"> Rechercher </button>
                </div>
            }
<h5 className="message1">produit scanné...</h5>
       <div className='class-food'> {ligneFood}</div>

      </main>
    </div>
  );
}

export default App;
