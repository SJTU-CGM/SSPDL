ModelEditor*
    - Menubar (-> ModelEditor)
    - ModuleViewer (-> ModelEditor)
        - ModuleViewer_ (-> ModuleViewer)
        - HintViewer
    - NamespaceViewer* (-> ModelEditor: update(oldName, newName, newDef))
        - Toolbar (-> ModelEditor: save(), reset(), delete())
        - NameListViewer (-> NamespaceViewer: focus(elem))
        - ElementEditor