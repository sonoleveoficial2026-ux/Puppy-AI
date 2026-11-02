import React, { useState, useEffect } from 'react';
import { PuppyProfile } from '../types';
import { X, PawPrint, Scale, Calendar, User, Dog, Check } from 'lucide-react';

interface PuppyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (puppy: PuppyProfile) => void;
  editingPuppy: PuppyProfile | null;
}

export const PuppyModal: React.FC<PuppyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingPuppy
}) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [ageWeeks, setAgeWeeks] = useState<number>(10);
  const [weightKg, setWeightKg] = useState<number>(5.0);
  const [expectedAdultWeightKg, setExpectedAdultWeightKg] = useState<number | ''>('');
  const [gender, setGender] = useState<'macho' | 'femea'>('macho');
  const [tutorName, setTutorName] = useState('');
  const [microchipId, setMicrochipId] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (editingPuppy) {
      setName(editingPuppy.name);
      setBreed(editingPuppy.breed);
      setAgeWeeks(editingPuppy.ageWeeks);
      setWeightKg(editingPuppy.weightKg);
      setExpectedAdultWeightKg(editingPuppy.expectedAdultWeightKg || '');
      setGender(editingPuppy.gender);
      setTutorName(editingPuppy.tutorName);
      setMicrochipId(editingPuppy.microchipId || '');
      setAvatarUrl(editingPuppy.avatarUrl || '');
    } else {
      setName('');
      setBreed('');
      setAgeWeeks(10);
      setWeightKg(5.0);
      setExpectedAdultWeightKg('');
      setGender('macho');
      setTutorName('');
      setMicrochipId('');
      setAvatarUrl('');
    }
  }, [editingPuppy, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const saved: PuppyProfile = {
      id: editingPuppy?.id || 'pup-' + Date.now(),
      name: name.trim(),
      breed: breed.trim() || 'SRD / Mestiço',
      ageWeeks: Number(ageWeeks) || 8,
      weightKg: Number(weightKg) || 3.0,
      expectedAdultWeightKg: expectedAdultWeightKg ? Number(expectedAdultWeightKg) : undefined,
      gender,
      tutorName: tutorName.trim() || 'Tutor Responsável',
      microchipId: microchipId.trim() || undefined,
      avatarUrl:
        avatarUrl.trim() ||
        editingPuppy?.avatarUrl ||
        'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80'
    };

    onSave(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <PawPrint className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
              {editingPuppy ? `Editar Dados: ${editingPuppy.name}` : 'Cadastrar Novo Filhote'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome do Filhote *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Raça</label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="Ex: Golden, Poodle..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Gênero</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setGender('macho')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    gender === 'macho' ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  Macho ♂
                </button>
                <button
                  type="button"
                  onClick={() => setGender('femea')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    gender === 'femea' ? 'bg-pink-50 border-pink-400 text-pink-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  Fêmea ♀
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Idade (Semanas) *</label>
              <input
                type="number"
                min="4"
                max="104"
                required
                value={ageWeeks}
                onChange={(e) => setAgeWeeks(Number(e.target.value) || 4)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Peso Atual (kg) *</label>
              <input
                type="number"
                min="0.3"
                max="90"
                step="0.1"
                required
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value) || 0.5)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Peso Adulto (kg - opcional)</label>
              <input
                type="number"
                min="1"
                max="100"
                step="0.5"
                value={expectedAdultWeightKg}
                onChange={(e) => setExpectedAdultWeightKg(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Microchip ID</label>
              <input
                type="text"
                value={microchipId}
                onChange={(e) => setMicrochipId(e.target.value)}
                placeholder="Ex: 982000123456789"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome do Tutor</label>
            <input
              type="text"
              value={tutorName}
              onChange={(e) => setTutorName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">URL da Foto / Avatar</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
          </div>

          <div className="pt-3 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold shadow-md shadow-orange-500/20"
            >
              Salvar Dados
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
