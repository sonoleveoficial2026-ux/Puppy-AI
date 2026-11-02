import React, { useState } from 'react';
import { PuppyProfile, VaccineRecord } from '../types';
import {
  Syringe,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  FileCheck,
  ShieldCheck,
  Printer,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VaccinePassportProps {
  activePuppy: PuppyProfile;
  vaccines: VaccineRecord[];
  onUpdateVaccine: (vaccine: VaccineRecord) => void;
  onAddVaccine: (vaccine: VaccineRecord) => void;
}

export const VaccinePassport: React.FC<VaccinePassportProps> = ({
  activePuppy,
  vaccines,
  onUpdateVaccine,
  onAddVaccine
}) => {
  const [selectedVaccineForEdit, setSelectedVaccineForEdit] = useState<VaccineRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New vaccine form state
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newWeek, setNewWeek] = useState<number>(12);
  const [newIsCore, setNewIsCore] = useState(true);

  // Edit dose form state
  const [editDate, setEditDate] = useState('');
  const [editVet, setEditVet] = useState('');
  const [editBatch, setEditBatch] = useState('');
  const [editStatus, setEditStatus] = useState<VaccineRecord['status']>('concluida');

  const openEditModal = (v: VaccineRecord) => {
    setSelectedVaccineForEdit(v);
    setEditDate(v.dateAdministered || new Date().toISOString().split('T')[0]);
    setEditVet(v.veterinarian || 'Dr(a). Veterinário(a)');
    setEditBatch(v.batchNumber || '');
    setEditStatus(v.status);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVaccineForEdit) return;

    const updated: VaccineRecord = {
      ...selectedVaccineForEdit,
      status: editStatus,
      dateAdministered: editStatus === 'concluida' ? editDate : undefined,
      veterinarian: editVet.trim() || undefined,
      batchNumber: editBatch.trim() || undefined
    };

    onUpdateVaccine(updated);
    setSelectedVaccineForEdit(null);

    if (editStatus === 'concluida') {
      try {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const handleCreateVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newVac: VaccineRecord = {
      id: 'vac-' + Date.now(),
      name: newName.trim(),
      description: newDesc.trim() || 'Dose complementar recomendada',
      targetWeek: Number(newWeek) || 12,
      status: Number(newWeek) < activePuppy.ageWeeks ? 'atrasada' : 'futura',
      isCore: newIsCore
    };

    onAddVaccine(newVac);
    setIsAddModalOpen(false);
    setNewName('');
    setNewDesc('');
  };

  const completedCount = vaccines.filter((v) => v.status === 'concluida').length;
  const coveragePercent = Math.round((completedCount / (vaccines.length || 1)) * 100);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Syringe className="w-3.5 h-3.5 text-emerald-600" />
            <span>Protocolo Imunológico WSAVA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Passaporte Vacinal de {activePuppy.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitoramento de doses essenciais (Core) e complementares para proteger seu filhote.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Imprimir Carteira</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Vacina</span>
          </button>
        </div>
      </div>

      {/* Immunization Progress Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4 no-print">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-base shadow-xs">
              {coveragePercent}%
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Cobertura Vacinal do Filhote
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                {completedCount} de {vaccines.length} doses administradas
              </div>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-400">Idade Atual: </span>
            <strong className="text-slate-900">{activePuppy.ageWeeks} semanas</strong>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${coveragePercent}%` }}
          />
        </div>
      </div>

      {/* Vaccines Table List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>Cronograma Imunológico Detalhado</span>
          <span className="text-[11px] text-slate-400 font-normal">Clique em qualquer vacina para atualizar</span>
        </div>

        <div className="space-y-3">
          {vaccines.map((vac) => {
            // Check if overdue: target week passed and not completed
            const isOverdue =
              vac.status !== 'concluida' && activePuppy.ageWeeks > vac.targetWeek;
            const currentStatus = isOverdue ? 'atrasada' : vac.status;

            return (
              <div
                key={vac.id}
                onClick={() => openEditModal(vac)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  currentStatus === 'concluida'
                    ? 'bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50'
                    : currentStatus === 'atrasada'
                    ? 'bg-red-50/60 border-red-300 hover:bg-red-50'
                    : currentStatus === 'agendada'
                    ? 'bg-amber-50/50 border-amber-200 hover:bg-amber-50'
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    currentStatus === 'concluida'
                      ? 'bg-emerald-600 text-white'
                      : currentStatus === 'atrasada'
                      ? 'bg-red-600 text-white'
                      : currentStatus === 'agendada'
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {currentStatus === 'concluida' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : currentStatus === 'atrasada' ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">{vac.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                        vac.isCore ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {vac.isCore ? 'Core (Essencial)' : 'Complementar'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                      {vac.description}
                    </p>
                    {vac.dateAdministered && (
                      <div className="text-[11px] text-emerald-800 font-semibold pt-0.5">
                        Aplicada em {vac.dateAdministered} {vac.veterinarian ? `por ${vac.veterinarian}` : ''} {vac.batchNumber ? `(Lote: ${vac.batchNumber})` : ''}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center shrink-0">
                  <div className="text-right text-xs">
                    <div className="text-slate-400 font-medium">Idade Ideal</div>
                    <div className="font-extrabold text-slate-800">{vac.targetWeek} semanas</div>
                  </div>

                  <span className={`text-xs font-extrabold px-3 py-1 rounded-xl uppercase tracking-wider ${
                    currentStatus === 'concluida'
                      ? 'bg-emerald-200 text-emerald-900'
                      : currentStatus === 'atrasada'
                      ? 'bg-red-200 text-red-900'
                      : currentStatus === 'agendada'
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {currentStatus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDIT MODAL */}
      {selectedVaccineForEdit && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Syringe className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  Registrar / Atualizar Dose
                </h3>
              </div>
              <button
                onClick={() => setSelectedVaccineForEdit(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-slate-900 text-sm">{selectedVaccineForEdit.name}</div>
              <div className="text-xs text-slate-500">{selectedVaccineForEdit.description}</div>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status da Dose</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-xs"
                >
                  <option value="concluida">Concluída / Aplicada</option>
                  <option value="agendada">Agendada</option>
                  <option value="atrasada">Atrasada</option>
                  <option value="futura">Futura</option>
                </select>
              </div>

              {editStatus === 'concluida' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Data da Aplicação</label>
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Médico(a) Veterinário(a)</label>
                    <input
                      type="text"
                      value={editVet}
                      onChange={(e) => setEditVet(e.target.value)}
                      placeholder="Ex: Dra. Juliana Costa (CRMV 18290)"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Número do Lote da Vacina</label>
                    <input
                      type="text"
                      value={editBatch}
                      onChange={(e) => setEditBatch(e.target.value)}
                      placeholder="Ex: V10-77491-ZOETIS"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
                    />
                  </div>
                </>
              )}

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedVaccineForEdit(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD VACCINE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  Nova Vacina no Protocolo
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVaccine} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome da Vacina *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: Vacina contra Leishmaniose Canina"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Descrição / Indicação</label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Ex: Prevenção em áreas endêmicas de flebótomos"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Idade Alvo (Semanas)</label>
                  <input
                    type="number"
                    min="4"
                    max="104"
                    value={newWeek}
                    onChange={(e) => setNewWeek(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Classificação WSAVA</label>
                  <select
                    value={newIsCore ? 'core' : 'non-core'}
                    onChange={(e) => setNewIsCore(e.target.value === 'core')}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold"
                  >
                    <option value="core">Essencial (Core)</option>
                    <option value="non-core">Complementar</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  Cadastrar Vacina
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
