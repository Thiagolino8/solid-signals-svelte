<script lang="ts">
  import {count, double} from '../store'
</script>

<button on:click={() => {$count++}}>
	count is {$count}
</button>
<p>And double is: {$double}</p>
