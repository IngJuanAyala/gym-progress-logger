# Documentación de la API - Gym Notes

Esta documentación detalla los endpoints disponibles en el backend de la aplicación Gym Notes.

**URL Base**: `http://localhost:3000`

---

## 1. Planes de Entrenamiento (Training Plans)

Este módulo permite gestionar las rutinas de ejercicios.

### `POST /training-plan`
**Descripción**: Crea un nuevo plan de entrenamiento.
**Uso**: Se utiliza cuando el usuario configura una nueva rutina en la aplicación.
**Cuerpo (JSON)**:
```json
{
  "name": "Nombre del Plan",
  "description": "Descripción opcional",
  "days": [
    {
      "name": "Día 1 - Pierna",
      "exercises": [
        {
          "name": "Sentadilla",
          "targetSets": 4,
          "targetReps": "10-12",
          "targetWeight": 80,
          "notes": "Bajar profundo"
        }
      ]
    }
  ]
}
```

### `GET /training-plan`
**Descripción**: Obtiene todos los planes de entrenamiento creados.
**Uso**: Para mostrar la lista de planes disponibles en la pantalla de inicio o configuración.

### `GET /training-plan/:id`
**Descripción**: Obtiene los detalles de un plan específico por su ID.
**Uso**: Para cargar la información completa de un plan cuando el usuario lo selecciona para ver o editar.

### `PATCH /training-plan/:id`
**Descripción**: Actualiza un plan existente.
**Uso**: Para modificar ejercicios, cambiar pesos objetivos o corregir nombres de días.
**Cuerpo (JSON)**: Puedes enviar solo los campos que deseas cambiar.

### `DELETE /training-plan/:id`
**Descripción**: Elimina un plan de entrenamiento.
**Uso**: Cuando el usuario quiere borrar una rutina antigua.

---

## 2. Entrenamientos (Workouts)

Este módulo gestiona el registro diario de las sesiones de ejercicio.

### `POST /workout`
**Descripción**: Registra una sesión de entrenamiento completada.
**Uso**: Se llama cuando el usuario finaliza su rutina y pulsa "Guardar Entrenamiento". Guarda los pesos y repeticiones reales realizados.
**Cuerpo (JSON)**:
```json
{
  "planId": "ID_DEL_PLAN",
  "dayName": "Día 1 - Pierna",
  "date": "2023-10-27T10:00:00Z",
  "exercises": [
    {
      "name": "Sentadilla",
      "sets": 4,
      "reps": [12, 12, 10, 8],
      "weight": [80, 80, 85, 85],
      "notes": "Me sentí fuerte"
    }
  ]
}
```

### `GET /workout`
**Descripción**: Obtiene el historial completo de entrenamientos.
**Uso**: Para mostrar la lista de sesiones pasadas en la pantalla de "Historial".
**Parámetros de Consulta (Query Params)**:
- `planId`: Filtrar por un plan específico. Ejemplo: `/workout?planId=12345`

### `GET /workout/:id`
**Descripción**: Obtiene el detalle de una sesión de entrenamiento específica.
**Uso**: Para ver qué se hizo exactamente en una fecha pasada.

### `PATCH /workout/:id`
**Descripción**: Actualiza un registro de entrenamiento.
**Uso**: Para corregir notas o datos ingresados erróneamente en una sesión pasada.

### `DELETE /workout/:id`
**Descripción**: Elimina un registro de entrenamiento.
**Uso**: Para borrar una sesión del historial.
