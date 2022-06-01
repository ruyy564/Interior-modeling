import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDesign } from '../hooks/design.hook';
import { BurgerMenu } from '../components/BurgerMenu';
import { DesignPanel } from '../components/DesignPanel';
import { DesignMenu } from '../components/DesignMenu';
import { ModalSave } from '../components/ModalSave';
import Design from '../components/Design';
import './main.css';
import './authPage.css';

export default function CreateProjectPage() {
  const { id } = useParams();
  const {
    setScene,
    refControls,
    target,
    mode,
    scene,
    texture,
    error,
    handleExport,
    loadFromFile,
    handleLoad,
    setTarget,
    changeScene,
    handleLoadFullScene,
    loadSceneById,
    saveScene,
  } = useDesign();

  useEffect(() => {
    if (id) {
      loadSceneById(id);
    }
  }, [id]);

  const [modalActive, setModalActive] = useState(false);
  const [form, setForm] = useState({ name: '', image: null });

  return (
    <div className="main-page">
      <BurgerMenu />
      <section className="content-wrapper">
        <DesignMenu />
        <h2>Создать проект</h2>
        <DesignPanel
          id={id}
          scene={scene}
          handleLoad={handleLoad}
          loadFromFile={loadFromFile}
          handleExport={handleExport}
          handleLoadFullScene={handleLoadFullScene}
          changeScene={changeScene}
          setModalActive={setModalActive}
        />
        <div className="content">
          <Design
            setScene={setScene}
            refControls={refControls}
            target={target}
            scene={scene}
            mode={mode}
            texture={texture}
            setTarget={setTarget}
          />
        </div>
      </section>
      <ModalSave
        form={form}
        setForm={setForm}
        modalActive={modalActive}
        setModalActive={setModalActive}
        saveScene={saveScene}
        error={error}
      />
    </div>
  );
}
