const express = require('express');
const router = express.Router()
const Autor = require('../models/autor')

//Rota de todos os autores
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.nome != null && req.query.nome !== '') {
      searchOptions.nome = new RegExp(req.query.nome, 'i')
    }
    try {
      const autores = await Author.find(searchOptions)
      res.render('autores/index', {
        autor: autores,
        searchOptions: req.query
      })
    } catch {
      res.redirect('/')
    }
  })


router.get('/novo', (req, res)=>{
    res.render('autores/novo', {autor: new Autor()})
})

//Rota de criar os autores
router.post('/', async (req, res) => {
  const autor = new Autor({
    nome: req.body.nome
  })
  try {
    const newAutor = await autor.save()
    // res.redirect(`autors/${newAutor.id}`)
    res.redirect(`autores`)
  } catch {
    res.render('autores/novo', {
      autor: autor,
      errorMessage: 'Error ao criar Autor'
    })
  }
})

module.exports = router

// const express = require('express')
// const router = express.Router()
// const Author = require('../models/author')

// // All Authors Route
// router.get('/', async (req, res) => {
//   let searchOptions = {}
//   if (req.query.name != null && req.query.name !== '') {
//     searchOptions.name = new RegExp(req.query.name, 'i')
//   }
//   try {
//     const authors = await Author.find(searchOptions)
//     res.render('authors/index', {
//       authors: authors,
//       searchOptions: req.query
//     })
//   } catch {
//     res.redirect('/')
//   }
// })

// // New Author Route
// router.get('/new', (req, res) => {
//   res.render('authors/new', { author: new Author() })
// })

// // Create Author Route
// router.post('/', async (req, res) => {
//   const author = new Author({
//     name: req.body.name
//   })
//   try {
//     const newAuthor = await author.save()
//     // res.redirect(`authors/${newAuthor.id}`)
//     res.redirect(`authors`)
//   } catch {
//     res.render('authors/new', {
//       author: author,
//       errorMessage: 'Error creating Author'
//     })
//   }
// })

// module.exports = router