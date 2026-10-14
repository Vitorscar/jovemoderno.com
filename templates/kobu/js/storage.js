/**
 * Storage.js — Camada de persistência com LocalStorage
 * Gerencia pets, agendamentos e usuário.
 */
const Storage = {
  _get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error(`Erro ao ler ${key}:`, e);
      return null;
    }
  },

  _set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Erro ao salvar ${key}:`, e);
    }
  },

  // --- PETS ---
  getPets() {
    return this._get('pets') || [];
  },

  setPets(pets) {
    this._set('pets', pets);
  },

  getPetById(id) {
    const pets = this.getPets();
    return pets.find(p => p.id === id) || null;
  },

  addPet(pet) {
    const pets = this.getPets();
    pet.id = Date.now().toString();
    pet.dataCriacao = new Date().toISOString();
    pet.vacinas = pet.vacinas || [];
    pet.consultas = pet.consultas || [];
    pets.push(pet);
    this.setPets(pets);
    return pet;
  },

  updatePet(id, dados) {
    const pets = this.getPets();
    const index = pets.findIndex(p => p.id === id);
    if (index !== -1) {
      pets[index] = { ...pets[index], ...dados };
      this.setPets(pets);
      return pets[index];
    }
    return null;
  },

  deletePet(id) {
    const pets = this.getPets();
    const filtered = pets.filter(p => p.id !== id);
    this.setPets(filtered);
    // Remove agendamentos vinculados
    const agendamentos = this.getAgendamentos().filter(a => a.petId !== id);
    this.setAgendamentos(agendamentos);
  },

  // --- AGENDAMENTOS ---
  getAgendamentos() {
    return this._get('agendamentos') || [];
  },

  setAgendamentos(agendamentos) {
    this._set('agendamentos', agendamentos);
  },

  addAgendamento(ag) {
    const agendamentos = this.getAgendamentos();
    ag.id = Date.now().toString();
    agendamentos.push(ag);
    this.setAgendamentos(agendamentos);
    return ag;
  },

  updateAgendamento(id, dados) {
    const agendamentos = this.getAgendamentos();
    const index = agendamentos.findIndex(a => a.id === id);
    if (index !== -1) {
      agendamentos[index] = { ...agendamentos[index], ...dados };
      this.setAgendamentos(agendamentos);
      return agendamentos[index];
    }
    return null;
  },

  deleteAgendamento(id) {
    const agendamentos = this.getAgendamentos().filter(a => a.id !== id);
    this.setAgendamentos(agendamentos);
  },

  // --- USUÁRIO ---
  getUsuario() {
    return this._get('usuario') || { nome: '', email: '', telefone: '', clinicaFavorita: '', notificacoes: true };
  },

  setUsuario(dados) {
    this._set('usuario', { ...this.getUsuario(), ...dados });
  },

  // --- UTILITÁRIOS ---
  getProximasVacinas(dias = 30) {
    const pets = this.getPets();
    const hoje = new Date();
    const limite = new Date();
    limite.setDate(hoje.getDate() + dias);
    const proximas = [];
    pets.forEach(pet => {
      (pet.vacinas || []).forEach(v => {
        if (!v.realizada) {
          const dataVac = new Date(v.data);
          if (dataVac >= hoje && dataVac <= limite) {
            proximas.push({ petNome: pet.nome, petId: pet.id, vacina: v.nome, data: v.data });
          }
        }
      });
    });
    return proximas.sort((a, b) => new Date(a.data) - new Date(b.data));
  },

  getProximosAgendamentos(dias = 30) {
    const hoje = new Date();
    const limite = new Date();
    limite.setDate(hoje.getDate() + dias);
    return this.getAgendamentos()
      .filter(a => {
        const data = new Date(a.data);
        return data >= hoje && data <= limite && a.status === 'pendente';
      })
      .sort((a, b) => new Date(a.data) - new Date(b.data));
  }
};