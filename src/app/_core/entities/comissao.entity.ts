export class Comissao {
  constructor(
    public iParceiroID: number,
    public iFranquiaID: number,
    public nPercentualComissao: number,
    public dtDataHora?: String,
    public iComissaoID?: number
  ) {}
}
