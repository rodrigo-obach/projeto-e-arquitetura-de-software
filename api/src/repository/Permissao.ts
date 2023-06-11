import { Permissao } from "../entity";
import { BaseRepository } from "./BaseRepository";


export class PermissaoRepository extends BaseRepository<Permissao> {
  constructor() {
    super(Permissao)
  }
}
