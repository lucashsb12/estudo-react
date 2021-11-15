import { Component } from 'react/cjs/react.production.min';

import './styles.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/button';
import { InputSearch } from '../../components/InputSearch';

export class Home extends Component{
    state = {
        posts: [],
        allPosts: [],
        begin: 0,
        postsPerPage: 4,
        searchValue: '',
        qtdSearch: 4
    };
    
    async componentDidMount(){
        await this.loadPosts();
    }

    loadPosts = async () =>{
        const postsAndPhotos = await loadPosts();
        const { begin, postsPerPage } = this.state;
        this.setState({
            posts: postsAndPhotos.slice(begin, postsPerPage),
            allPosts: postsAndPhotos
        });
    }

    loadMorePosts = () =>{
        const {begin, postsPerPage, allPosts, posts} = this.state;
        const nextBegin = begin + postsPerPage;
        const nextPosts = allPosts.slice(nextBegin, nextBegin + postsPerPage);
        posts.push(...nextPosts);
        this.setState({posts, begin: nextBegin});
    }

    searchPost = (event) =>{
        const { value } = event.target;
        this.setState({searchValue: value});
    }
    
    selectedPosts = () =>{
        const {allPosts, searchValue, qtdSearch} = this.state;
        const filteredPosts = allPosts.filter(post =>{
            return post.title.toLowerCase().includes(searchValue.toLowerCase());
        });

        let filteredPostsQtd = [];
        for(let a = 0; a < qtdSearch; a++){
            filteredPostsQtd.push(filteredPosts[a]);
        }

        return filteredPostsQtd;
    }

    render(){
        const { posts, begin, postsPerPage, allPosts, searchValue} = this.state;
        const noMorePosts = begin + postsPerPage >= allPosts.length;

        const filteredPosts = !!searchValue ? this.selectedPosts() : posts;
        return(
            <section className="container">
                {!!searchValue && (
                    <>
                        <h1>Search value: {searchValue}</h1>
                    </>    
                )}
                <div className="input-container">
                    <label>Pesquisar:</label>
                    <InputSearch value={searchValue} onChange={this.searchPost}/>
                </div>    

                {filteredPosts.length > 0 ? <Posts posts={filteredPosts} /> : <p>Nenhum post encontrado!</p>}
                <div className="button-container">
                    {!searchValue && (
                        <Button 
                        onClick={this.loadMorePosts} 
                        textButton="Load More"
                        disabled={noMorePosts}
                        />
                    )}
                </div>    
            </section>    
        )
    }
}



















// COMPONENTE DE CLASSE SEM ESTADO
// class App extends Component{
//   render(){
//     return (
//       <h1>Oi</h1>
//     )
//   }
// }

// COMPONENTE DE CLASSE COM ESTADO
// class App extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       name: 'Lucas Henrique',
//       counter: 0
//     };
//   }
// OU 

// class App extends Component{
//   state = {
//       name: 'Lucas Henrique',
//       counter: 0
//   };

//   handleChangeName = () =>{
//     this.setState({name: "Novo nome"});
//   }

//   handlePrevClick = (event) =>{
//     event.preventDefault();
//     const { counter } = this.state;
//     this.setState({counter: counter + 1});
//   }

//   render(){
//     const { name, counter } = this.state;
//     return(
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p className="contador" onClick={this.handleChangeName}>
//             <span>{name}</span> Você clicou {counter} vezes
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//             onClick={this.handlePrevClick}
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     )
//   }
// }

// COMPONENTE DE FUNÇÃO SEM ESTADO
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// componentDidUpdate(){
    //     // this.setState({counter: 0});
    //     this.handleTimeOut();
    // }

    // handleTimeOut = () =>{
    //     const { posts, counter } = this.state;
    //     posts[0].title = 'Mudou';
    //     setTimeout(() =>{
    //         this.setState({posts, counter: counter + 1});
    //     }, 1000);
    // }

    // handleResetCounter = () =>{
    //     this.setState({counter: 0});
    // }

    // handleChangeName = () =>{
    //     this.setState({name: "Novo nome"});
    // }

    // handlePrevClick = (event) =>{
    //     event.preventDefault();
    //     const { counter } = this.state;
    //     this.setState({counter: counter + 1});
    // }