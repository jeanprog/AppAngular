export class Franquia {
  constructor(
    public iParceiroID: number,
    public iStoreID: number,
    public sNome: string,
    public sEmail: string,
    public sTipoLink: string,
    public sLinkFranquia: string,
    public iCodFranquiaGerado: number,
    public dtDataHoraCadastro: Date,
    public sSenha: string,
    public iFranquiaID?: number
  ) {}
}
