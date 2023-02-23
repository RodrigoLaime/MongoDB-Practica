'use strict'

var Note = require('../models/note');

/* objeto controller para disponer de todas las funciones de ruta  de la app */

var controller = {
    /* metodo para guardar una nota */
    save : (req, res) => {
        // obtener los datos *
        var params = req.body;
        console.log(params);
        //* objeto a guardar 
        var note = new Note();
        //asignar los valores
        note.title = params.title;
        note.description = params.description;
        //guardar articulo en la base de datos
        note.save((err, noteStored) => {
            if(err || !noteStored){
                return res.status(404).send({
                    status: 'Error',
                    message: 'La nota no se ha guardado'
                });
            }
            // devolver una respuesta si no hay error 
            return res.status(200).send({
                status: 'succes',
                noteStored
            });
        })
    },
    //obtener
    getNotes: (req, res) => {
        var query = Note.find({});//devuelve todo en la consulta

        query.sort('-date').exec((err, notes) => {//devuelve en oden de fechas
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al extraer los datos'
                });
            }
            //si no existen notas
            if(!notes){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No hay notas para mostrar'
                });
            }
            //si existen y obtenemos las notas
            return res.status(200).send({
                status: 'Succes',
                notes//
            });
        });
    },
    //eliminar
    delete: (req, res) => {
        var noteId = req.params.id;

        Note.findOneAndDelete({_id: noteId}, (err, noteRemoved) => {
            if (err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al eliminar'
                })
            }

            if (!noteRemoved){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se ha encontrado la nota a eliminar'
                })
            }
            //si no hay error
            return res.status(200).send({
                status: 'success',
                note: noteRemoved
            })
        })
    },
    //actualizar
    update: (req, res) => {
        var noteId = req.params.id;
        var params = req.body;
        const title = params.title;
        const description = params.description;

        Note.findOneAndUpdate({_id: noteId}, {title: title, description: description}, {new: true}, (err, noteUpdated) => {
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al actualizar'
                })
            }
            if(!noteUpdated){
                return res.status(404).send({
                    status: 'Error',
                    message: 'La nota no existe'
                })
            }
            /* si todo es correcto */
            return res.status(200).send({
                status: 'Succes',
                note: noteUpdated
            })
        })
    }
};

module.exports = controller;