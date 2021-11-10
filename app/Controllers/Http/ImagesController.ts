import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ImagesController {
  public async create({ view }: HttpContextContract) {
    return view.render('image/create')
  }

  public async store({ request, response, session, view }: HttpContextContract) {
    const picture = request.file('picture')

    if (picture) {
      const name = `${Date.now()}.${picture.extname}`

      await picture.move(Application.tmpPath('uploads'), {
        name
      })

      session.flash('success', `Image disponible ici : ${Application.tmpPath('uploads')}/${name}`)
    } else {
      session.flash('danger', 'Aucune image uploadé')
    }

    return response.redirect().toRoute('ImagesController.create')
  }
}
