import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ImagesController {
  public async create({ view }: HttpContextContract) {
    return view.render('image/create')
  }

  public async store({ request }: HttpContextContract) {
    const picture = request.file('picture')

    if (picture) {
      await picture.move(Application.tmpPath('uploads'))
    }
  }
}
