// author:  Julian garcia
// This Module Handles Setting the State of Articles, Rendering List of Article Cards to the DOM, and Delete and Edit Functionality for A Single Article 

import React, { Component } from 'react'
import ArticleCard from './ArticlesCard'
import './ArticlesStyles/ArticlesList.css';
import ApiManager from '../modules/ApiManager';

class ArticlesList extends Component {
    // defines what this component needs to render
    state = {
        articles: [],
    }

    componentDidMount() {
        //getAll from ApiManager, hangs on to that data, and puts it into state
        ApiManager.getAll("articles")
            .then((articles) => {
                articles.sort((a,b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()));
                this.setState({
                    articles: articles
                })
            })
    }

    deleteArticle = id => {
        // handles deleting a single article from articles array and renders updated array to the DOM
        ApiManager.delete("articles", id)
            .then(() => {
                ApiManager.getAll("articles")
                    .then((updatedArticlesList) => {
                        updatedArticlesList.sort((a,b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()))
                        this.setState({
                            articles: updatedArticlesList
                        })
                    })
            })
    }
    
    render() {
        return (
            <>
                <h1>Articles</h1>
                <section>
                    <button type="button"
                        className="newArticleButton"
                        // onClick renders articleForm.js 
                        onClick={() => { this.props.history.push("/articles/new") }}>
                        Add A New Article
                    </button>
                </section>
                <div className="articlesList">
                    {/* array function that maps over articles array and renders a single card for each article */}
                    {this.state.articles.map(article =>
                        <ArticleCard
                        key={article.id}
                        article={article}
                        deleteArticle={this.deleteArticle}
                        {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default ArticlesList;
