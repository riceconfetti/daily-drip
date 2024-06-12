<script lang="ts">
  export let version;
</script>

<div>
  <div>
    <p>Version {version.number}</p>
    <p>{version.date}</p>
  </div>
  <h1>
    {version.title ? version.title : `Version ${version.number}: ???????`}
  </h1>
</div>
